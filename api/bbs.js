export function postSupportApi(post_id, type = "support") {
  return useHttpPost("postSupport", `/post/${type}`, {
    body: { post_id },
    $: true,
  });
}

export function deletePostApi(id, type = "support") {
  return useHttpPost("deletePost", "/post/delete", {
    body: { id },
    $: true,
  });
}

export function bbsTypeListApi(query) {
  return useHttpGet("bbsTypeList", "/bbs", { query });
}

export function postListApi(query) {
  return useHttpGet("bbsPostList", "/post/list", { query });
}

export function postReadApi(query) {
  return useHttpGet("postRead", "/post/read", { query });
}

export function postCommentApi(query) {
  return useHttpGet("postComment", "/post_comment", { query });
}
 
export function postReplyApi(body) {
  return useHttpPost("postReply", "/post/reply", {
    body,
    $: true,  
  });
}

export function addPostApi(body) {
  return useHttpPost("addPost", "/post/save", {
    body,
    $: true,
  });
}
