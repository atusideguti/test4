//ロード時のイベント


//LISTクリックイベント
$(document).on('click','#main_list',function(){
    console.log("クリック確認");
    var url = $("ons-list#url").val();
    window.open(url, '_blank', 'location=no');
});

//関数(仮)
function make_list(){
 console.log("関数確認");
}

//DBオープン
function openDB(){
    var dbName = 'main_db';
    var version = '1.2';
    var displayName = 'main_db';
    var estimatedSize = 65536;
    return openDatabase(dbName, version, displayName, estimatedSize);
}

//DB作成
function createt_tbl(){ 
    var db = openDB(); 

    db.transaction(
        function(trans){
            trans.executeSql(
              'CREATE TABLE IF NOT EXISTS list_tbl ' 
            + '( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' 
            + ' title TEXT NOT NULL,' 
            + ' origin TEXT NOT NULL,' 
            + ' contents TEXT NOT NULL,' 
            + ' URL TEXT NOT NULL);'
            );
            } 

    ); 
    console.log("DB作成完了");
    //データ挿入
    ins_sql ='INSERT INTO list_tbl (title, origin,contents,URL) VALUES ("2本当は怖いおそ松さん","dnaveまとめ","おそ松さんの都市伝説まとめ【死後の世界？実は八つ子？】","http://matome.naver.jp/odai/2145456176395655101");';
    
    db.transaction(
        function(trans){
            trans.executeSql(ins_sql);
            } 
    ); 
    console.log("データ挿入完了");

}


//DB作成初回のみ
function first_createt_tbl(){ 
 var db = openDB();
 console.log(db.version);
if (db.version == "1.1") {
    db.changeVersion("1.1", "1.2",
        function(db) {
        createt_tbl();
    }, function(err) {
            console.log("バージョンアップ変更失敗");
    }, function() {
            console.log("バージョンアップ変更成功");
    });
}
}


//データ取得
function getData(){ 
    var db = openDB(); 
    db.transaction( 
        function(trans){ 
            trans.executeSql( 'SELECT * FROM list_tbl where id=4;', [], 
            function(trans, r){ 
                for(var i=0; i<r.rows.length; i++){
                    console.log( 
                    'id=' 
                    + r.rows.item(i).id 
                    + ' title=' 
                    + r.rows.item(i).title
                    + ' origin=' 
                    + r.rows.item(i).origin
                    + ' contents=' 
                    + r.rows.item(i).contents
                    + ' URL=' 
                    + r.rows.item(i).URL                      
                ); 
                } 
            } 
            ); 
        } 
    ); 
　　console.log("DB取得完了");
}

//リストのデータ取得(引数1：ID、引数2：列名)
function get_List_Data(id,column){
    var db = openDB(); 
    sql = "SELECT * FROM list_tbl where id="+id+";";

    db.transaction( 
        function(trans){ 
            trans.executeSql(sql, [], 
            function(trans, r){ 
                for(var i=0; i<r.rows.length; i++){
                    get_date = r.rows.item(i).id;
                    $('#contentsX').val("test");
                    console.log("SQLの実施"+get_date);
                } 
            } 
            ); 
        } 
    );
}