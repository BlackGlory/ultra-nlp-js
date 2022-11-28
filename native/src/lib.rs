use neon::prelude::*;
use ultra_nlp::{
    Match,
    BehaviorForUnmatched,
    cedarwood,
    daachorse,
    hashmap,
};

struct JsCedarwoodForwardDictionary {
    dict: cedarwood::ForwardDictionary,
}

struct JsCedarwoodBackwardDictionary {
    dict: cedarwood::BackwardDictionary,
}

impl Finalize for JsCedarwoodForwardDictionary {}
impl Finalize for JsCedarwoodBackwardDictionary {}

struct JsDaachorseStandardDictionary {
    dict: daachorse::StandardDictionary,
}

struct JsDaachorseForwardDictionary {
    dict: daachorse::ForwardDictionary,
}

struct JsDaachorseBackwardDictionary {
    dict: daachorse::BackwardDictionary,
}

impl Finalize for JsDaachorseStandardDictionary {}
impl Finalize for JsDaachorseForwardDictionary {}
impl Finalize for JsDaachorseBackwardDictionary {}

struct JsHashmapDictionary {
    dict: hashmap::Dictionary,
}

impl Finalize for JsHashmapDictionary {}

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

    cx.export_function("cedarwoodCreateForwardDictionary", cedarwood_create_forward_dictionary)?;
    cx.export_function("cedarwoodCreateBackwardDictionary", cedarwood_create_backward_dictionary)?;
    cx.export_function("cedarwoodSegmentFully", cedarwood_segment_fully)?;
    cx.export_function("cedarwoodSegmentForwardLongest", cedarwood_segment_forward_longsest)?;
    cx.export_function("cedarwoodSegmentBackwardLongest", cedarwood_segment_backward_longest)?;
    cx.export_function("cedarwoodSegmentBidirectionalLongest", cedarwood_segment_bidirectional_longest)?;

    cx.export_function("daachorseCreateStandardDictionary", daachorse_create_standard_dictionary)?;
    cx.export_function("daachorseCreateForwardDictionary", daachorse_create_forward_dictionary)?;
    cx.export_function("daachorseCreateBackwardDictionary", daachorse_create_backward_dictionary)?;
    cx.export_function("daachorseSegmentFully", daachorse_segment_fully)?;
    cx.export_function("daachorseSegmentForwardLongest", daachorse_segment_forward_longsest)?;
    cx.export_function("daachorseSegmentBackwardLongest", daachorse_segment_backward_longest)?;
    cx.export_function("daachorseSegmentBidirectionalLongest", daachorse_segment_bidirectional_longest)?;

    cx.export_function("hashmapCreateDictionary", hashmap_create_dictionary)?;
    cx.export_function("hashmapSegmentFully", hashmap_segment_fully)?;
    cx.export_function("hashmapSegmentForwardLongest", hashmap_segment_forward_longsest)?;
    cx.export_function("hashmapSegmentBackwardLongest", hashmap_segment_backward_longest)?;
    cx.export_function("hashmapSegmentBidirectionalLongest", hashmap_segment_bidirectional_longest)?;

    Ok(())
}

// cedarwoodCreateForwardDictionary(patterns: string[]): NativeCedarForwardDictionary
fn cedarwood_create_forward_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsCedarwoodForwardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match cedarwood::ForwardDictionary::new(patterns) {
        Ok(dict) =>Ok(cx.boxed(JsCedarwoodForwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// cedarwoodCreateBackwardDictionary(patterns: string[]): NativeCedarwoodBackwardDictionary
fn cedarwood_create_backward_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsCedarwoodBackwardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match cedarwood::BackwardDictionary::new(patterns) {
        Ok(dict) => Ok(cx.boxed(JsCedarwoodBackwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// cedarwoodSegmentFully(
//   text: string
// , dict: NativeCedarwoodForwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn cedarwood_segment_fully(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsCedarwoodForwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = cedarwood::segment_fully(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// cedarwoodSegmentForwardLongest(
//   text: string
// , dict: NativeCedarwoodForwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn cedarwood_segment_forward_longsest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsCedarwoodForwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = cedarwood::segment_forward_longest(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// cedarwoodSegmentBackwardLongest(
//   text: string
// , dict: NativeCedarwoodBackwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn cedarwood_segment_backward_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsCedarwoodBackwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = cedarwood::segment_backward_longest(text, dict, behavior_for_unmatched);

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// cedarwoodSegmentBidirectionalLongest(
//   text: string
// , forwardDict: NativeCedarForwardDictionary
// , backwardDict: NativeCedarBackwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn cedarwood_segment_bidirectional_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let forward_dict = &cx.argument::<JsBox<JsCedarwoodForwardDictionary>>(1)?.dict;
    let backward_dict = &cx.argument::<JsBox<JsCedarwoodBackwardDictionary>>(2)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(3)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = cedarwood::segment_bidirectional_longest(
        text,
        forward_dict,
        backward_dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// daachorseCreateStandardDictionary(patterns: string[]): NativeDaachorseDictionary
fn daachorse_create_standard_dictionary(
    mut cx: FunctionContext
) -> JsResult<JsBox<JsDaachorseStandardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match daachorse::StandardDictionary::new(patterns) {
        Ok(dict) => Ok(cx.boxed(JsDaachorseStandardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string()),
    }
}

// daachorseCreateForwardDictionary(patterns: string[]): NativeDaachorseForwardDictionary
fn daachorse_create_forward_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsDaachorseForwardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match daachorse::ForwardDictionary::new(patterns) {
        Ok(dict) =>Ok(cx.boxed(JsDaachorseForwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// daachorseCreateBackwardDictionary(patterns: string[]): NativeDaachorseBackwardDictionary
fn daachorse_create_backward_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsDaachorseBackwardDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match daachorse::BackwardDictionary::new(patterns) {
        Ok(dict) => Ok(cx.boxed(JsDaachorseBackwardDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// daachorseSegmentFully(
//   text: string
// , dict: NativeDaachorseStandardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn daachorse_segment_fully(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsDaachorseStandardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = daachorse::segment_fully(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// daachorseSegmentForwardLongest(
//   text: string
// , dict: NativeDaachorseForwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn daachorse_segment_forward_longsest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsDaachorseForwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = daachorse::segment_forward_longest(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// daachorseSegmentBackwardLongest(
//   text: string
// , dict: NativeDaachorseBackwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn daachorse_segment_backward_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsDaachorseBackwardDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = daachorse::segment_backward_longest(text, dict, behavior_for_unmatched);

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// daachorseSegmentBidirectionalLongest(
//   text: string
// , forwardDict: NativeDaachorseForwardDictionary
// , backwardDict: NativeDaachorseBackwardDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn daachorse_segment_bidirectional_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let forward_dict = &cx.argument::<JsBox<JsDaachorseForwardDictionary>>(1)?.dict;
    let backward_dict = &cx.argument::<JsBox<JsDaachorseBackwardDictionary>>(2)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(3)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = daachorse::segment_bidirectional_longest(
        text,
        forward_dict,
        backward_dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// hashmapCreateDictionary(patterns: string[]): NativeHashmapDictionary
fn hashmap_create_dictionary(mut cx: FunctionContext) -> JsResult<JsBox<JsHashmapDictionary>> {
    let patterns = cx.argument::<JsArray>(0)?;
    let patterns = js_array_to_vec_string(&mut cx, patterns)?;

    match hashmap::Dictionary::new(patterns) {
        Ok(dict) =>Ok(cx.boxed(JsHashmapDictionary { dict })),
        Err(err) => cx.throw_error(err.to_string())
    }
}

// hashmapSegmentFully(
//   text: string
// , dict: NativeHashmapDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn hashmap_segment_fully(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsHashmapDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = hashmap::segment_fully(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// hashmapSegmentForwardLongest(
//   text: string
// , dict: NativeHashmapDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn hashmap_segment_forward_longsest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsHashmapDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = hashmap::segment_forward_longest(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// hashmapSegmentBackwardLongest(
//   text: string
// , dict: NativeHashmapDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn hashmap_segment_backward_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsHashmapDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = hashmap::segment_backward_longest(text, dict, behavior_for_unmatched);

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

// hashmapSegmentBidirectionalLongest(
//   text: string
// , dict: NativeHashmapDictionary
// , behaviorForUnmatched: BehaviorForUnmatched
// ): IMatch[]
fn hashmap_segment_bidirectional_longest(mut cx: FunctionContext) -> JsResult<JsArray> {
    let text = cx.argument::<JsString>(0)?;
    let text = js_string_to_string(&mut cx, text)?;

    let dict = &cx.argument::<JsBox<JsHashmapDictionary>>(1)?.dict;

    let behavior_for_unmatched = cx.argument::<JsNumber>(2)?;
    let behavior_for_unmatched = js_number_to_behavior_for_unmatched(
        &mut cx,
        behavior_for_unmatched
    )?;

    let matches = hashmap::segment_bidirectional_longest(
        text,
        dict,
        behavior_for_unmatched
    );

    let js_array = matches_to_js_array(&mut cx, matches)?;

    Ok(js_array)
}

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
        match obj.index_of_patterns() {
            Some(x) => {
                let value = cx.number(x);
                mat.set(cx, "indexOfPatterns", value)?;
            },
            None => {
                let value = cx.null();
                mat.set(cx, "indexOfPatterns", value)?;
            },
        };

        js_array.set(cx, i as u32, mat)?;
    }

    Ok(js_array)
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
