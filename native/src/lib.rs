use neon::prelude::*;
use ultra_nlp::{
    Match,
    StandardDictionary,
    BackwardDictionary,
    ForwardDictionary,
    BehaviorForUnmatched,
};

pub struct JsStandardDictionary {
    dict: StandardDictionary,
}

pub struct JsForwardDictionary {
    dict: ForwardDictionary,
}

pub struct JsBackwardDictionary {
    dict: BackwardDictionary,
}

impl Finalize for JsStandardDictionary {}
impl Finalize for JsForwardDictionary {}
impl Finalize for JsBackwardDictionary {}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    let behavior_for_unmatched = cx.empty_object();
    let ignore = cx.number(BehaviorForUnmatched::Ignore as u8);
    behavior_for_unmatched.set(&mut cx, "Ignore", ignore)?;
    let keep_as_words = cx.number(BehaviorForUnmatched::KeepAsWords as u8);
    behavior_for_unmatched.set(&mut cx, "KeepAsWords", keep_as_words)?;
    let keep_as_chars = cx.number(BehaviorForUnmatched::KeepAsChars as u8);
    behavior_for_unmatched.set(&mut cx, "KeepAsChars", keep_as_chars)?;
    cx.export_value("BehaviorForUnmatched", behavior_for_unmatched)?;

    cx.export_function("createStandardDictionary", create_standard_dictionary)?;
    cx.export_function("createStandardDictionaryWithTfIdf", create_standard_dictionary_with_tf_idf)?;
    cx.export_function("createForwardDictionary", create_forward_dictionary)?;
    cx.export_function("createForwardDictionaryWithTfIdf", create_forward_dictionary_with_tf_idf)?;
    cx.export_function("createBackwardDictionary", create_backward_dictionary)?;
    cx.export_function("createBackwardDictionaryWithTfIdf", create_backward_dictionary_with_tf_idf)?;

    cx.export_function("segmentFully", segment_fully)?;
    cx.export_function("segmentForwardLongest", segment_forward_longsest)?;
    cx.export_function("segmentBackwardLongest", segment_backward_longest)?;
    cx.export_function("segmentBidirectionalLongest", segment_bidirectional_longest)?;
    // cx.export_function("extractKeywords", extract_keywords)?;

    Ok(())
}

// createStandardDictionary(patterns: string[]): NativeStandardDictionary
fn create_standard_dictionary(
    mut cx: FunctionContext
) -> JsResult<JsBox<JsStandardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match StandardDictionary::new(patterns) {
        Ok(dict) => Ok(cx.boxed(JsStandardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string()),
    }
}

// createStandardDictionary(
//   patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
// ): NativeStandardDictionary
fn create_standard_dictionary_with_tf_idf(
    mut cx: FunctionContext
) -> JsResult<JsBox<JsStandardDictionary>> {
    let patterns_with_tf_idf = cx.argument::<JsArray>(0)?;
    let patterns_with_tf_idf = patterns_with_tf_idf_to_vec(
        &mut cx,
        patterns_with_tf_idf
    )?;

    match StandardDictionary::new_with_tf_idf(patterns_with_tf_idf) {
        Ok(dict) => Ok(cx.boxed(JsStandardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// createForwardDictionary(patterns: string[]): NativeForwardDictionary
fn create_forward_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsForwardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match ForwardDictionary::new(patterns) {
        Ok(dict) =>Ok(cx.boxed(JsForwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// createForwardDictionary(
//   patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
// ): NativeForwardDictionary
fn create_forward_dictionary_with_tf_idf(mut cx: FunctionContext) -> JsResult<JsBox<JsForwardDictionary>> {
    let patterns_with_tf_idf = cx.argument::<JsArray>(0)?;
    let patterns_with_tf_idf = patterns_with_tf_idf_to_vec(
        &mut cx,
        patterns_with_tf_idf
    )?;

    match ForwardDictionary::new_with_tf_idf(patterns_with_tf_idf) {
        Ok(dict) => Ok(cx.boxed(JsForwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// createBackwardDictionary(patterns: string[]): NativeBackwardDictionary
fn create_backward_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsBackwardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match BackwardDictionary::new(patterns) {
        Ok(dict) => Ok(cx.boxed(JsBackwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// createBackwardDictionary(
//   patternsWithTfIdf: Array<[pattern: string, tfIdf: number]>
// ): NativeBackwardDictionary
fn create_backward_dictionary_with_tf_idf(mut cx: FunctionContext) -> JsResult<JsBox<JsBackwardDictionary>> {
    let patterns_with_tf_idf = cx.argument::<JsArray>(0)?;
    let patterns_with_tf_idf = patterns_with_tf_idf_to_vec(
        &mut cx,
        patterns_with_tf_idf
    )?;

    match BackwardDictionary::new_with_tf_idf(patterns_with_tf_idf) {
        Ok(dict) => Ok(cx.boxed(JsBackwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// segmentFully(
//   text: string
// , dict: NativeStandardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn segment_fully(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsStandardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = ultra_nlp::segment_fully(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// segmentForwardLongest(
//   text: string
// , dict: NativeForwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn segment_forward_longsest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsForwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = ultra_nlp::segment_forward_longest(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// segmentBackwardLongest(
//   text: string
// , dict: NativeBackwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn segment_backward_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsBackwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = ultra_nlp::segment_backward_longest(text, dict, behavior_for_unmatched);

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// segmentBidirectionalLongest(
//   text: string
// , forwardDict: NativeForwardDictionary
// , backwardDict: NativeBackwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn segment_bidirectional_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let forward_dict = &cx.argument::<JsBox<JsForwardDictionary>>(1)?.dict;
    let backward_dict = &cx.argument::<JsBox<JsBackwardDictionary>>(2)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(3)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = ultra_nlp::segment_bidirectional_longest(
        text,
        forward_dict,
        backward_dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// extractKeywords(matches: IMatch[], top: number): IMatch[]
// fn extract_keywords(mut cx: FunctionContext) -> JsResult<JsArray> {}

fn matches_to_js_array<'a>(
    cx: &mut FunctionContext<'a>,
    matches: Vec<Match>
) -> NeonResult<Handle<'a, JsArray>> {
    let js_array = JsArray::new(cx, matches.len() as u32);
    for (i, obj) in matches.iter().enumerate() {
        let mat = cx.empty_object();

        let range = cx.empty_object();
        let start_index = cx.number(obj.range().start_index() as f64);
        range.set(cx, "startIndex", start_index)?;
        let end_index = cx.number(obj.range().end_index() as f64);
        range.set(cx, "endIndex", end_index)?;

        mat.set(cx, "range", range)?;
        match obj.tf_idf() {
            Some(x) => {
                let tf_idf = cx.number(x);
                mat.set(cx, "tfIdf", tf_idf)?;
            },
            None => {
                let tf_idf = cx.null();
                mat.set(cx, "tfIdf", tf_idf)?;
            },
        };

        js_array.set(cx, i as u32, mat)?;
    }

    Ok(js_array)
}

fn patterns_with_tf_idf_to_vec(
    cx: &mut FunctionContext,
    patterns_with_tf_idf: Handle<JsArray>
) -> NeonResult<Vec<(String, f64)>> {
    let result = patterns_with_tf_idf
        .to_vec(cx)?
        .into_iter()
        .map(|x| -> Result<(String, f64), _> {
            x.downcast::<JsArray, _>(cx)
                .or_throw(cx)
                .map(|x| -> Result<(String, f64), _>{
                    let pattern = x.get::<JsString, _, _>(cx, 0)?.value(cx);
                    let tf_idf = x.get::<JsNumber, _, _>(cx, 1)?.value(cx);

                    Ok((pattern, tf_idf))
                })?
        })
        .collect::<Result<Vec<_>, _>>()?;

    Ok(result)
}

fn js_array_to_vec_string(
    cx: &mut FunctionContext,
    arr: Handle<JsArray>,
) -> NeonResult<Vec<String>> {
    let result = arr
        .to_vec(cx)?
        .into_iter()
        .map(|x| {
            x.downcast::<JsString, _>(cx)
                .or_throw(cx)
                .map(|x| x.value(cx))
        })
        .collect::<Result<Vec<_>, _>>()?;

    Ok(result)
}

fn js_string_to_string(
    cx: &mut FunctionContext,
    val: Handle<JsString>
) -> NeonResult<String> {
    let result = val
        .downcast::<JsString, _>(cx)
        .or_throw(cx)?
        .value(cx);

    Ok(result)
}

fn js_number_to_behavior_for_unmatched(
    cx: &mut FunctionContext,
    val: Handle<JsNumber>
) -> NeonResult<BehaviorForUnmatched> {
    let result = val
        .downcast::<JsNumber, _>(cx)
        .or_throw(cx)?
        .value(cx);

    let result = match result {
        x if x == BehaviorForUnmatched::Ignore as u8 as f64 => BehaviorForUnmatched::Ignore,
        x if x == BehaviorForUnmatched::KeepAsWords as u8 as f64 => BehaviorForUnmatched::KeepAsWords,
        x if x == BehaviorForUnmatched::KeepAsChars as u8 as f64 => BehaviorForUnmatched::KeepAsChars,
        _ => panic!("Invalid BehaviorForUnmatched"),
    };

    Ok(result)
}
