var user = $('#btn_createAccount').click(function () {
    var user = $('#userName').val();
    alert(user);
    
    var txt = new ActiveXObject("Scripting.FileSystemObject");
    var a = txt.CreateTextFile("C:\\test\stickman.txt", true);
    a.WriteLine(user);
    a.WriteLine("| 1")
    a.Close();
        
    
    
});