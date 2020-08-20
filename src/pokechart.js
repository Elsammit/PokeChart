import React, { Component } from 'react';
import "./pokechart.css";
import Papa from 'papaparse';
import pokecsv from './pokemon_status.csv';
import {
    RadarChart, Tooltip, PolarGrid, PolarAngleAxis, Radar
  } from 'recharts';



// ポケモン1 データ
var Name = ""
var Attack = 0
var Defense = 0
var HP = 0
var SpAtk = 0
var SpDef = 0
var Speed = 0

// ポケモン2 データ
var Name2 = ""
var Attack2 = 0
var Defense2 = 0
var HP2 = 0
var SpAtk2 = 0
var SpDef2 = 0
var Speed2 = 0

export default class Cooking extends React.Component  {
    constructor (props) {
        super(props);
        this.state = {
            location:0,
            hitflg:true,
            hitpoint:30,
            Name:["",""],
            Attack:[0, 0],
            Defense:[0, 0],
            HP:[0, 0],
            SpAtk:[0, 0],
            SpDef:[0, 0],
            Speed:[0, 0],
            BaseParam:[0,0,0,0,0,0],
            doryokuchi:["0","0","0","0","0","0"],
            kotaichi:["0","0","0","0","0","0"],
            csvfile:undefined,
            point:0
        };
    }

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
    convertCSVtoArray = (str, PokeNum) =>{ // 読み込んだCSVデータが文字列として渡される
        return new Promise(resolve =>{
            var result = str;
            var copyName = this.state.Name.slice();
            var copyAttack = this.state.Attack.slice();
            var copyDefence = this.state.Defense.slice();
            var copyHP = this.state.HP.slice();
            var copySpAtk = this.state.SpAtk.slice();
            var copySpDef = this.state.SpDef.slice();
            var copySpeed = this.state.Speed.slice();
            var copyParam = this.state.BaseParam.slice();

            PokeNum = 1;
            if(PokeNum == 1){
                var Name = document.getElementById("pokeName").value;
                for(var i=1;i<result.length;i++){
                    if(result[i]["ポケモン名"] == Name){
                        console.log("Get Name");
                        copyName[0] = result[i]["ポケモン名"];
                        copyAttack[0] = Number(result[i]["こうげき"]);
                        copyDefence[0] = Number(result[i]["ぼうぎょ"]);
                        copyHP[0] = Number(result[i]["HP"]);
                        copySpAtk[0] = Number(result[i]["とくこう"]);
                        copySpDef[0] = Number(result[i]["とくぼう"]);
                        copySpeed[0] = Number(result[i]["すばやさ"]);
                        
                        copyParam[0] = Number(result[i]["HP"]);
                        copyParam[1] = Number(result[i]["こうげき"]);
                        copyParam[2] = Number(result[i]["ぼうぎょ"]);
                        copyParam[3] = Number(result[i]["とくこう"]);
                        copyParam[4] = Number(result[i]["とくぼう"]);
                        copyParam[5] = Number(result[i]["すばやさ"]);

                        this.setState({
                            Name:copyName,
                            Attack:copyAttack,
                            Defense:copyDefence,
                            HP:copyHP,
                            SpAtk:copySpAtk,
                            SpDef:copySpDef,
                            Speed:copySpeed,
                            BaseParam:copyParam
                        })
                    }
                }
            }     
            resolve("1");
        });
    }

      getCSV = (PokeNum) =>{
        return new Promise(resolve =>{
            document.getElementById("HPDoryoku").value = 0;
            this.setState({
                point:0
            })
            var reqq = new XMLHttpRequest();
            reqq.open("get", "pokemon_status.csv", true); // アクセスするファイルを指定
            reqq.send(null); // HTTPリクエストの発行
            
            // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
            reqq.onload = ()=>{
                Papa.parse(reqq.responseText, {
                    header: true,
                    delimiter:',',
    
                    complete:(buf) =>{
                        console.log(buf.data);
                        this.convertCSVtoArray(buf.data, PokeNum).then(() =>{
                            resolve("0");
                        });
                        resolve("0");
                    },
                });
                resolve("0");
            }
        });
    }

    test = (e) =>{
        var copy = this.state.doryokuchi.slice();
        if(e.target.id.match(/pluse/)){
            copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) + 4;
        }else{
            copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) - 4;
        }
        console.log("test:"+e.target.name);
        console.log(e.target);
        this.setState({
            doryokuchi:copy
        })
        this.HPDoyoku();
        this.AtkDoyoku();
        this.DefDoyoku();
        this.CDoyoku();
        this.BDoyoku();
        this.SpDoyoku();
    }

    SetKotaichi = (e) =>{
        var copy = this.state.kotaichi.slice();
        if(e.target.id.match(/pluse/)){
            copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) + 1;
        }else{
            copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) - 1;
        }
        this.setState({
            kotaichi:copy
        })
        this.HPDoyoku();
        this.AtkDoyoku();
        this.DefDoyoku();
        this.CDoyoku();
        this.BDoyoku();
        this.SpDoyoku();
    }


    HPDoyoku = () =>{
        if(document.getElementById("HPDoryoku") === null || document.getElementById("HPKotai") === null ){
           console.log("doryoku null !!");
           return;
        }

        var HPdoryoku = document.getElementById("HPDoryoku").value;
        var HPKotai = document.getElementById("HPKotai").value;
        //var HPdoryoku2 = document.getElementById("HPDoryoku2").value;
        //var HPKotai2 = document.getElementById("HPKotai2").value;
        var HPdoryoku2 = 0;
        var HPKotai2 = 0;

        var copyHP = this.state.HP.slice();
        var BaseParam = this.state.BaseParam.slice();

        copyHP[0] = BaseParam[0];
        copyHP[0] = copyHP[0] +Number(HPKotai/2);
        //copyHP[1] = Number(copyHP[1]) +Number(HPKotai2/2);

        if(HPdoryoku > 0){
            copyHP[0] = copyHP[0] + Number((HPdoryoku - 4)/8);
        }
    
        if(HPdoryoku2 > 0){
            copyHP[1] = Number(copyHP[1]) + Number((HPdoryoku2 - 4)/8);
        }

        console.log("HPDoryoku:"+copyHP[0]);
    
        this.setState({
            HP:copyHP
        })
    }
    
    AtkDoyoku = () =>{
        if(document.getElementById("AtkDoryoku") === null || document.getElementById("AtkKotai") === null ){
            console.log("doryoku null !!");
            return;
         }

        var Atkdoryoku = document.getElementById("AtkDoryoku").value;
        var AtkKotai = document.getElementById("AtkKotai").value;
        var Atkdoryoku2 = 0;
        //var Atkdoryoku2 = document.getElementById("AtkDoryoku2").value;
        //var AtkKotai2 = document.getElementById("AtkKotai2").value;
    
        //var pokeObj = new Object();

        var copyAtk = this.state.Attack.slice();
        var BaseParam = this.state.BaseParam.slice();

        copyAtk[0] = BaseParam[1];
        copyAtk[0] = copyAtk[0] +Number(AtkKotai/2);
    
        if(Atkdoryoku > 0){
            //pokeObj.Atk = Number(pokeObj.Atk) + Number((Atkdoryoku - 4)/8);
            copyAtk[0] = copyAtk[0] + Number((Atkdoryoku - 4)/8);
        }
    
        if(Atkdoryoku2 > 0){
            //pokeObj.Atk2 = Number(pokeObj.Atk2) + Number((Atkdoryoku2 - 4)/8);
        }
        console.log("AtkDoryoku:"+copyAtk[0]);
        this.setState({
            Attack:copyAtk
        })

    }
    
    DefDoyoku = () =>{
        var DefDoryoku = document.getElementById("DefDoryoku").value;
        var DefKotai = document.getElementById("DefKotai").value;
        //var DefDoryoku2 = document.getElementById("DefDoryoku2").value;
        //var DefKotai2 = document.getElementById("DefKotai2").value;
        var DefDoryoku2 = 0;

        //var pokeObj = new Object();
    
        var copyDef = this.state.Defense.slice();
        var BaseParam = this.state.BaseParam.slice();

        copyDef[0] = BaseParam[1];
        copyDef[0] = copyDef[0] +Number(DefKotai/2);
    
        //pokeObj.Def = Number(Defense)+Number(/2);
        //pokeObj.Def2 = Number(Defense)+Number(DefKotai2/2);
    
        if(DefDoryoku > 0){
            //pokeObj.Def = Number(pokeObj.Def) + Number((DefDoryoku - 4)/8);
            copyDef[0] = copyDef[0] + Number((DefDoryoku - 4)/8);
        }
    
        if(DefDoryoku2 > 0){
            //pokeObj.Def2 = Number(pokeObj.Def2) + Number((DefDoryoku2 - 4)/8);
        }
        console.log("DefDoryoku:"+copyDef[0]);
        this.setState({
            Defense:copyDef
        })
    }
    
    BDoyoku = () =>{
        var BDoryoku = document.getElementById("BDoryoku").value;
        var BKotai = document.getElementById("BKotai").value;
        //var BDoryoku2 = document.getElementById("BDoryoku2").value;
        //var BKotai2 = document.getElementById("BKotai2").value;
        var BDoryoku2 = 0;
    
        //var pokeObj = new Object();
    
        //pokeObj.B = Number(SpDef)+Number(BKotai/2);
        //pokeObj.B2 = Number(SpDef)+Number(BKotai2/2);

        var copyB = this.state.SpDef.slice();
        var BaseParam = this.state.BaseParam.slice();

        copyB[0] = BaseParam[1];
        copyB[0] = copyB[0] +Number(BKotai/2);
    
        if(BDoryoku > 0){
            //pokeObj.B = Number(pokeObj.B) + Number((BDoryoku - 4)/8);
            copyB[0] = copyB[0] + Number((BDoryoku - 4)/8);
        }
    
        if(BDoryoku2 > 0){
            //pokeObj.B2 = Number(pokeObj.B2) + Number((BDoryoku2 - 4)/8);
        }
        console.log("BDoryoku:"+copyB[0]);
        this.setState({
            SpDef:copyB
        })
    }
    
    CDoyoku = () =>{
        var CDoryoku = document.getElementById("CDoryoku").value;
        var CKotai = document.getElementById("CKotai").value;
        //var CDoryoku2 = document.getElementById("CDoryoku2").value;
        //var CKotai2 = document.getElementById("CKotai2").value;
        var CDoryoku2 = 0;

        //var pokeObj = new Object();
    
        //pokeObj.C = Number(SpAtk)+Number(CKotai/2);
        //pokeObj.C2 = Number(SpAtk2)+Number(CKotai2/2);
        
        var copyC = this.state.SpAtk.slice();
        var BaseParam = this.state.BaseParam.slice();

        copyC[0] = BaseParam[1];
        copyC[0] = copyC[0] +Number(CKotai/2);       

        if(CDoryoku > 0){
            copyC[0] = copyC[0] + Number((CDoryoku - 4)/8);
            //pokeObj.C = Number(pokeObj.C) + Number((CDoryoku - 4)/8);
        }
    
        if(CDoryoku2 > 0){
            //pokeObj.C2 = Number(pokeObj.C2) + Number((CDoryoku2 - 4)/8);
        }
        console.log("CDoryoku:"+copyC[0]);
        this.setState({
            SpAtk:copyC
        })
    }
    
    SpDoyoku = () =>{
        var SPDoryoku = document.getElementById("SPDoryoku").value;
        var SPKotai = document.getElementById("SPKotai").value;
        var SPDoryoku2 = 0;

        var copySp = this.state.Speed.slice();
        var BaseParam = this.state.BaseParam.slice();

        copySp[0] = BaseParam[1];
        copySp[0] = copySp[0] +Number(SPKotai/2);

        if(SPDoryoku > 0){
            copySp[0] = copySp[0] + Number((SPDoryoku - 4)/8);
        }
    
        if(SPDoryoku2 > 0){
        }
        console.log("SppedDoryoku:"+copySp[0]);
        this.setState({
            Speed:copySp
        })
    }

    Radar = () =>{

        const {HP} = this.state;
        const {Attack} = this.state;
        const {Defense} = this.state;
        const {Speed} = this.state;
        const {SpAtk} = this.state;
        const {SpDef} = this.state;

        const dataRadar = [
            { rank: 'HP', poke1: HP[0], poke2: HP[1] },
            { rank: '攻撃', poke1: Attack[0], poke2: Attack[1] },
            { rank: '防御', poke1: Defense[0], poke2: Defense[1] },
            { rank: '素早さ', poke1: Speed[0], poke2: Speed[1] },
            { rank: '特防', poke1: SpDef[0], poke2: SpDef[1] },
            { rank: '特攻', poke1: SpAtk[0], poke2: SpAtk[1] },
            ];
            
        return(<RadarChart // レーダーチャートのサイズや位置、データを指定
            height={400} width={500} cx="50%" cy="50%" data={dataRadar} //ここにArray型のデータを指定
                >
            <PolarGrid /> 
            <PolarAngleAxis
                dataKey="rank" //数値を表示したい値のキーを指定
            />
            <Radar //レーダーの色や各パラメーターのタイトルを指定
                name="pokemon1"  //hoverした時に表示される名前を指定 
                dataKey="poke1" //Array型のデータのパラメータータイトルを指定
                stroke="#8884d8"  //レーダーの線の色を指定
                fill="#8884d8" //レーダーの中身の色を指定
                fillOpacity={0.6} //レーダーの中身の色の薄さを指定
                    />
                <Radar //レーダーの色や各パラメーターのタイトルを指定
                    name="Mike"  //hoverした時に表示される名前を指定 
                    dataKey="poke2" //Array型のデータのパラメータータイトルを指定
                    stroke="#8884d8"  //レーダーの線の色を指定
                    fill="#A5A5A5A5" //レーダーの中身の色を指定
                    fillOpacity={0.6} //レーダーの中身の色の薄さを指定
                />
                <Tooltip /> //hoverすると各パラメーターの値が表示される
            </RadarChart>
        );
    }

    Set_DoryokuchiBox = (doryokuchi, doryokuchiID,Plus, Minus) =>{
        const menulabel = doryokuchiID.substr(0,1);

        return(
            <div>
                <div className="doryokuchi_label">
                    <label>{menulabel}</label>
                </div>
                <div className="doryokuchi">
                    <input type="button" value="+" id={Plus} onClick={this.test} className="boxform" /><br/>
                    <input type="number" name="0" min="0" max="252" value={doryokuchi} step="4" id={doryokuchiID} onClick={this.test} /><br/>
                    <input type="button" value="-" id={Minus} onClick={this.test} className="boxform" />
                </div>
            </div>
        );
    }


    Input_Doryokuchi = (input) =>{
        var PlusArray = ["PokeDoryokupluse0","PokeDoryokupluse1","PokeDoryokupluse2","PokeDoryokupluse3","PokeDoryokupluse4","PokeDoryokupluse5"];
        var MinusArray = ["PokeDoryokuminus0","PokeDoryokuminus1","PokeDoryokuminus2","PokeDoryokuminus3","PokeDoryokuminus4","PokeDoryokuminus5"];

        for(var i=0;i<PlusArray.length;i++){
            PlusArray[i] =  input + "_" + PlusArray[i];
            MinusArray[i] = input + "_" + MinusArray[i];
        }

        return(
            <div>
                <div className="doryokuchi_title">
                    <p>努力値</p>
                </div>

                <div className="input">
                    {this.Set_DoryokuchiBox(this.state.doryokuchi[0], "HPDoryoku",PlusArray[0], MinusArray[0])}
                    {this.Set_DoryokuchiBox(this.state.doryokuchi[1], "AtkDoryoku",PlusArray[1], MinusArray[1])}
                    {this.Set_DoryokuchiBox(this.state.doryokuchi[2], "DefDoryoku",PlusArray[2], MinusArray[2])}
                    {this.Set_DoryokuchiBox(this.state.doryokuchi[3], "CDoryoku",PlusArray[3], MinusArray[3])}
                    {this.Set_DoryokuchiBox(this.state.doryokuchi[4], "BDoryoku",PlusArray[4], MinusArray[4])}
                    {this.Set_DoryokuchiBox(this.state.doryokuchi[5], "SPDoryoku",PlusArray[5], MinusArray[5])}
                </div>
            </div>
        );
    }

    Set_KotaichiBox = (Kotaichi, KotaichiID,Plus, Minus) =>{
        const menulabel = KotaichiID.substr(0,1);

        return(
            <div>
                <div className="doryokuchi_label">
                    <label>{menulabel}</label>
                </div>
                <div className="doryokuchi">
                    <input type="button" value="+" id={Plus} onClick={this.SetKotaichi} className="boxform" /><br/>
                    <input type="number" name="num1" min="0" max="310" value={Kotaichi} step="1" id={KotaichiID} OnClick={this.SetKotaichi}/><br/>
                    <input type="button" value="-" id={Minus} onClick={this.SetKotaichi} className="boxform" />
                </div>
            </div>
        );
    }

    Input_Kotaichi = (input) =>{
        var PlusArray = ["Pokekotaichipluse0","Pokekotaichipluse1","Pokekotaichipluse2","Pokekotaichipluse3","Pokekotaichipluse4","Pokekotaichipluse5"];
        var MinusArray = ["Pokekotaichiminus0","Pokekotaichiminus1","Pokekotaichiminus2","Pokekotaichiminus3","Pokekotaichiminus4","Pokekotaichiminus5"];

        for(var i=0;i<PlusArray.length;i++){
            PlusArray[i] =  input + "_" + PlusArray[i];
            MinusArray[i] = input + "_" + MinusArray[i];
        }

        return(
            <div className="input">
                <div className="doryokuchi_title">
                    <p>個体値</p>
                </div>
                {this.Set_KotaichiBox(this.state.kotaichi[0], "HPKotai", PlusArray[0], MinusArray[0])}
                {this.Set_KotaichiBox(this.state.kotaichi[1], "AtkKotai", PlusArray[1], MinusArray[1])}
                {this.Set_KotaichiBox(this.state.kotaichi[2], "DefKotai", PlusArray[2], MinusArray[2])}
                {this.Set_KotaichiBox(this.state.kotaichi[3], "CKotai", PlusArray[3], MinusArray[3])}
                {this.Set_KotaichiBox(this.state.kotaichi[4], "BKotai", PlusArray[4], MinusArray[4])}
                {this.Set_KotaichiBox(this.state.kotaichi[5], "SPKotai", PlusArray[5], MinusArray[5])}
            </div>
        );
    }

    render() {
        return (<div>
            <div className="pokename_title">
                <h1>ポケモンチャート</h1>
            </div>
            <div className="pokename_title">
                <a>ポケモン1名：</a>
                <input type="text" id="pokeName" maxLength="20"/>
                <input type="button" value="Click" onClick={() => this.getCSV(1)}></input><br/>
            </div>
    
            <div className="ParamWaku">
                {this.Input_Doryokuchi(1)}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.Input_Kotaichi(1)}
            </div>
            <br/>
            {this.Radar()};
        </div>);
    }
  }