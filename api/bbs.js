export function postSupportApi(post_id, type = "support") {
  return useHttpPost("postSupport", `/post/${type}`, {
    body: { post_id },
    $: true,
  });
}

export function deletePostApi(id, type = "support") {
  return useHttpPost("deletePost", "post/delete", {
    body: { id },
    $: true,
  });
}
