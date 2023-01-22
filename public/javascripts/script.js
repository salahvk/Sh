function addToCart(proId){
    console.log("add to cart function called")
$.ajax({  
    url:'/add-to-cart/'+proId,
    method:'get',
    success:(response)=>{
        console.log(response)
        if(response.status){
            console.log("true")
            let count = $('#cart-count').html()
            count = parseInt(count) + 1
            $('#cart-count').html(count)
        }else{
            console.log("false")
        }

    }
})
}

 