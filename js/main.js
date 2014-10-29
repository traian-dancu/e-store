 $(function() {

    var o;
    var i;
    var cart = [];
    
    $.get('items.json', function(items){
                for(i=0;i < items.length; i++) {
            o = items[i];
            $(  '<div class= "item grid_4"> <img src="' + o.imgSrc + '" alt="bow tie" />' +
                '<h2>' + o.name + '</h2>' +
                '<p>Price:' + ' ' + '&#163; ' + o.price +'</p>'+ 
                '<button class="add-to-cart" type="button">Add to Cart</button> </div>' 
                    ).appendTo(".items").data("index", i);
        };

        $('.add-to-cart').on('click', function () {
            var cartElement = $('#cart');
            var parent = $(this).parent('.item');
            var imgtodrag = parent.find("img").eq(0);
            if (imgtodrag) {
                var imgclone = imgtodrag.clone()
                    .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                    .css({
                    'opacity': '0.5',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '100'
                })
                    .appendTo($('body'))
                    .animate({
                    'top': cartElement.offset().top + 10,
                        'left': cartElement.offset().left + 10,
                        'width': 75,
                        'height': 75
                }, 1000, 'linear');
     
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach()
                    var i = parent.data("index");
                    cart.push(items[i]);  
                    $("cart-container").empty();
                    for(var j=0;j<cart.length;j++) {
                        $('<div>' + cart[j] + '</div>').appendTo(".cart-container");
                    };

                    updateCartSummary();
                    updateCartContent();
                });
            }
        
        });
    });

    $('#cart').click(function(){
        $('#cart-content').slideToggle("slow");
    });

    function updateCartSummary(){
        var sum = 0;

        for(var i=0; i<cart.length; i++){
            sum += cart[i].price;
        }

        $('#cart .cart-sum').text(sum);
        $('#cart .cart-items').text(cart.length);
    }

    function updateCartContent(){
        var p;
        var $prod;
        var $delBut;

        $('#cart-content').empty();

        for(var i=0; i<cart.length; i++){
            p = cart[i];
            $prod = $('<div>' + p.name + ': ' + p.price + '</div>');
            $prod.appendTo('#cart-content');
            $delBut = $('<button>remove</button>');
            $delBut.data('cart-index', i);
            $delBut.on('click', function(){
                var i = $(this).data('cart-index');

                cart.splice(i, 1);
                updateCartSummary();
                updateCartContent();
            });
            $delBut.appendTo($prod);
        }
    }

});
