{
    //post request to create a post
    console.log('hello');
    let createtPost = () => {
        let newPostForm = $('#new-post-form')
        newPostForm.submit((e) => {
            e.preventDefault()

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let newPost=newPostDom(data.data.post)
                    $('.post-list>ul').prepend(newPost)
                    deletePost($(' .delete-post-button',newPost))
                },
                error: (error) => {
                    console.log(error.resposeText);
                }
            })
        })
    }
    //method to create the post in DOM
    let newPostDom = (post) => {
        return $(`
            <li id="post-id-${post._id}">
            <p>${post.content}
                <small>${post.user.name}</small>
                <small><a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a></small>
            </p>
                <div class="post-comment-add">
                    <form action="/comment/create" method="post">
                        <input type="text" name="content" placeholder="Type Here to comment..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <button type="submit">Comment</button>
                    </form>
                </div>
            </li>
        `)
    }

    createtPost()

    //method to delete a post from DOM
    let deletePost=(deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault()

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: (data)=>{
                    // console.log(data);
                    $(`#post-id-${data.data}`).remove()
                },
                error: (error)=>{
                    console.log(error.resposeText);
                }
            })
        })
    }

    //Adding the deletePost function to all a links
    $(' .delete-post-button').each((index,element)=> {
        deletePost($(element))
      });

}

