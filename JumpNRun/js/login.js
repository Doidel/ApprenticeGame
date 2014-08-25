var txtfile = $('#btn').click(function () {
    $('#txtFile').load("test.txt", function(msg){
        var myArray = msg.split("\n");
        
        for(var i=0;i<myArray.length;i++)
        {
            localStorage.setItem(i, myArray[i]);
            alert(i);
        }
    }

});