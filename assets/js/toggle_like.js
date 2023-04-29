class ToggleLike{

    constructor(toggleElement){
        this.toggler=toggleElement
        this.toggleLike()
    }
    toggleLike(){
        $(this.toggler).click((e)=>{
            e.preventDefault()
            let self=this.toggler
            let url= $(self).attr('href')
            console.log(url);
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done((data)=>{
                console.log(data);
                let likesCount=parseInt($(self).attr('data-likes'))
                console.log(likesCount)
                if(data.deleted==true){
                    likesCount-=1
                }
                else{
                    likesCount+=1
                }

                $(self).attr('data-likes',likesCount)
                $(self).html(`${likesCount} Likes`)
            })
            .fail((errData)=>{
                console.log('err in completing comment',errData);
            })
        })
    }

}