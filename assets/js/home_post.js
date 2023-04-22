{
    //post request to create a post
    console.log('hello');
    let createtPost=()=>{
        let newPostForm=$('#new-post-form')
        newPostForm.submit((e)=>{
            e.preventDefault()

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: (data)=>{
                    console.log(data);
                },
                error: (error)=>{
                    console.log(error.resposeText);
                }
            })
        })
    }
    createtPost()

    //method to create the post in DOM
}