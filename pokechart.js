function getCSV(PokeNum){
    return new Promise(resolve =>{
        var req = new XMLHttpRequest();
        req.open("get", "pokemon_status.csv", true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行
        
        // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
        req.onload = function(){
            p = convertCSVtoArray(req.responseText, PokeNum); // 読み込んだCSVデータをセット.
            p.then(function(){
                test();
                resolve("0");
            });
            resolve("0");
        }
    });
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str, PokeNum){ // 読み込んだCSVデータが文字列として渡される
    return new Promise(resolve =>{
        var result = []; // 最終的な二次元配列を入れるための配列
        var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            result[i] = tmp[i].split(',');
        }

        if(PokeNum == 1){
            Name = document.getElementById("pokeName").value;
            for(var i=1;i<tmp.length;i++){
                if(result[i][1] == Name){
                    console.log("Get Name");
                    Name = result[i][1]
                    Attack = result[i][8]
                    Defense = result[i][9]
                    HP = result[i][7]
                    SpAtk = result[i][12]
                    SpDef = result[i][11]
                    Speed = result[i][10]
                }
            }
        }else{
            Name2 = document.getElementById("pokeName2").value;
            for(var i=1;i<tmp.length;i++){
                if(result[i][1] == Name2){
                    console.log("Get Name");
                    Name2 = result[i][1]
                    Attack2 = result[i][8]
                    Defense2 = result[i][9]
                    HP2 = result[i][7]
                    SpAtk2 = result[i][12]
                    SpDef2 = result[i][11]
                    Speed2 = result[i][10]
                }
            }
        }        
        resolve("1");
    });
}

// ポケモン1 データ
Name = ""
Attack = 0
Defense = 0
HP = 0
SpAtk = 0
SpDef = 0
Speed = 0

// ポケモン2 データ
Name2 = ""
Attack2 = 0
Defense2 = 0
HP2 = 0
SpAtk2 = 0
SpDef2 = 0
Speed2 = 0

function HPDoyoku(){
    HPdoryoku = document.getElementById("HPDoryoku").value;
    HPKotai = document.getElementById("HPKotai").value;
    HPdoryoku2 = document.getElementById("HPDoryoku2").value;
    HPKotai2 = document.getElementById("HPKotai2").value;
    
    var pokeObj = new Object();

    console.log("HP:%s ",HP);
    pokeObj.HP = Number(HP) +Number(HPKotai/2);
    pokeObj.HP2 = Number(HP2) +Number(HPKotai2/2);
    
    if(HPdoryoku > 0){
        //console.log("Before HP is %s",HP_Hon);
        pokeObj.HP = Number(pokeObj.HP)+ Number((HPdoryoku - 4)/8);
        //console.log("HP is %s",HP_Hon);
        //console.log("HPdoryoku is %s",(HPdoryoku - 4)/8);
    }

    if(HPdoryoku2 > 0){
        //console.log("Before HP is %s",HP_Hon2);
        pokeObj.HP2 = Number(pokeObj.HP2)+ Number((HPdoryoku2 - 4)/8);
        //console.log("HP is %s",pokeObj.HP2);
        //console.log("HPdoryoku is %s",(HPdoryoku2 - 4)/8);
    }

    console.log("Calc HP:%s ",pokeObj.HP);
    return pokeObj;
}

function AtkDoyoku(){
    Atkdoryoku = document.getElementById("AtkDoryoku").value;
    AtkKotai = document.getElementById("AtkKotai").value;
    Atkdoryoku2 = document.getElementById("AtkDoryoku2").value;
    AtkKotai2 = document.getElementById("AtkKotai2").value;

    var pokeObj = new Object();

    pokeObj.Atk = Number(Attack)+Number(AtkKotai/2);
    pokeObj.Atk2 = Number(Attack2)+Number(AtkKotai2/2);
    console.log(Atkdoryoku);
    if(Atkdoryoku > 0){
        pokeObj.Atk = Number(pokeObj.Atk) + Number((Atkdoryoku - 4)/8);
    }

    if(Atkdoryoku2 > 0){
        pokeObj.Atk2 = Number(pokeObj.Atk2) + Number((Atkdoryoku2 - 4)/8);
    }

    return pokeObj;
}

function DefDoyoku(){
    DefDoryoku = document.getElementById("DefDoryoku").value;
    DefKotai = document.getElementById("DefKotai").value;
    DefDoryoku2 = document.getElementById("DefDoryoku2").value;
    DefKotai2 = document.getElementById("DefKotai2").value;

    var pokeObj = new Object();

    pokeObj.Def = Number(Defense)+Number(DefKotai/2);
    pokeObj.Def2 = Number(Defense)+Number(DefKotai2/2);

    if(DefDoryoku > 0){
        pokeObj.Def = Number(pokeObj.Def) + Number((DefDoryoku - 4)/8);
    }

    if(DefDoryoku2 > 0){
        pokeObj.Def2 = Number(pokeObj.Def2) + Number((DefDoryoku2 - 4)/8);
    }

    return pokeObj;
}

function BDoyoku(){
    BDoryoku = document.getElementById("BDoryoku").value;
    BKotai = document.getElementById("BKotai").value;
    BDoryoku2 = document.getElementById("BDoryoku2").value;
    BKotai2 = document.getElementById("BKotai2").value;

    var pokeObj = new Object();

    pokeObj.B = Number(SpDef)+Number(BKotai/2);
    pokeObj.B2 = Number(SpDef)+Number(BKotai2/2);

    if(BDoryoku > 0){
        pokeObj.B = Number(pokeObj.B) + Number((BDoryoku - 4)/8);
    }

    if(BDoryoku2 > 0){
        pokeObj.B2 = Number(pokeObj.B2) + Number((BDoryoku2 - 4)/8);
    }

    return pokeObj;
}

function CDoyoku(){
    CDoryoku = document.getElementById("CDoryoku").value;
    CKotai = document.getElementById("CKotai").value;
    CDoryoku2 = document.getElementById("CDoryoku2").value;
    CKotai2 = document.getElementById("CKotai2").value;

    var pokeObj = new Object();

    pokeObj.C = Number(SpAtk)+Number(CKotai/2);
    pokeObj.C2 = Number(SpAtk2)+Number(CKotai2/2);

    if(CDoryoku > 0){
        pokeObj.C = Number(pokeObj.C) + Number((CDoryoku - 4)/8);
    }

    if(CDoryoku2 > 0){
        pokeObj.C2 = Number(pokeObj.C2) + Number((CDoryoku2 - 4)/8);
    }

    return pokeObj;
}

function SpDoyoku(){
    SPDoryoku = document.getElementById("SPDoryoku").value;
    SPKotai = document.getElementById("SPKotai").value;
    SPDoryoku2 = document.getElementById("SPDoryoku2").value;
    SPKotai2 = document.getElementById("SPKotai2").value;

    var pokeObj = new Object();

    pokeObj.Sp = Number(Speed)+Number(SPKotai/2);
    pokeObj.Sp2 = Number(Speed2)+Number(SPKotai2/2);

    if(SPDoryoku > 0){
        pokeObj.Sp = Number(pokeObj.Sp) + Number((SPDoryoku - 4)/8);
    }

    if(SPDoryoku2 > 0){
        pokeObj.Sp2 = Number(pokeObj.Sp2) + Number((SPDoryoku2 - 4)/8);
    }

    return pokeObj;
}

var ctx = document.getElementById("myRaderChart");
function test(){
    ctx.width=window.innerWidth*0.3;
    ctx.height=window.innerHeight*0.3;

    var Obj_HP = HPDoyoku();
    var Obj_Atk = AtkDoyoku();
    var Obj_Def = DefDoyoku();
    var Obj_C = CDoyoku();
    var Obj_B = BDoyoku();
    var Obj_Sp = SpDoyoku();

    var myRadarChart = new Chart(ctx, {
        type: 'radar', 
        data: { 
            labels: ["HP", "攻撃", "防御", "素早さ", "特防","特攻"],
            datasets: [{
                label: Name,
                data: [Obj_HP.HP, Obj_Atk.Atk, Obj_Def.Def, Obj_Sp.Sp, Obj_B.B, Obj_C.C],
                backgroundColor: 'RGBA(225,95,150, 0.5)',
                borderColor: 'RGBA(225,95,150, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'RGB(46,106,177)'
            },{
                label: Name2,
                data: [Obj_HP.HP2, Obj_Atk.Atk2, Obj_Def.Def2, Obj_Sp.Sp2, Obj_B.B2,Obj_C.C2],
                backgroundColor: 'RGBA(115,255,25, 0.5)',
                borderColor: 'RGBA(115,255,25, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'RGB(46,106,177)'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'ステータス'
            },
            scale:{
                ticks:{
                    suggestedMin: 0,
                    suggestedMax: 200,
                    stepSize: 20,
                    callback: function(value, index, values){
                        return  value
                    }
                }
            }
        }
    });
}


getCSV(); //最初に実行される