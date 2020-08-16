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
            }else{
                Name2 = document.getElementById("pokeName2").value;
                for(var i=1;i<result.length;i++){
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
    }


    HPDoyoku = () =>{
        /*
        if(document.getElementById("HPDoryoku") === null || document.getElementById("HPKotai") === null ||
            document.getElementById("HPDoryoku2") === null || document.getElementById("HPKotai2") === null){
                console.log("doryoku null !!");
                return;
        }
        */
       
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

        var pokeObj = new Object();
    
        pokeObj.Def = Number(Defense)+Number(DefKotai/2);
        //pokeObj.Def2 = Number(Defense)+Number(DefKotai2/2);
    
        if(DefDoryoku > 0){
            pokeObj.Def = Number(pokeObj.Def) + Number((DefDoryoku - 4)/8);
        }
    
        if(DefDoryoku2 > 0){
            //pokeObj.Def2 = Number(pokeObj.Def2) + Number((DefDoryoku2 - 4)/8);
        }
    
        return pokeObj;
    }
    
    BDoyoku = () =>{
        var BDoryoku = document.getElementById("BDoryoku").value;
        var BKotai = document.getElementById("BKotai").value;
        var BDoryoku2 = document.getElementById("BDoryoku2").value;
        var BKotai2 = document.getElementById("BKotai2").value;
    
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
    
    CDoyoku = () =>{
        var CDoryoku = document.getElementById("CDoryoku").value;
        var CKotai = document.getElementById("CKotai").value;
        var CDoryoku2 = document.getElementById("CDoryoku2").value;
        var CKotai2 = document.getElementById("CKotai2").value;
    
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
    
    SpDoyoku = () =>{
        var SPDoryoku = document.getElementById("SPDoryoku").value;
        var SPKotai = document.getElementById("SPKotai").value;
        var SPDoryoku2 = document.getElementById("SPDoryoku2").value;
        var SPKotai2 = document.getElementById("SPKotai2").value;
    
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

    Radar = () =>{
        //this.HPDoyoku();

        const {HP} = this.state;
        const {Attack} = this.state;
        const {Defense} = this.state;
        const {Speed} = this.state;
        const {SpAtk} = this.state;
        const {SpDef} = this.state;

        const dataRadar = [
            { rank: 'HP', poke1: HP[0], poke2: 100 },
            { rank: '攻撃', poke1: Attack[0], poke2: 100 },
            { rank: '防御', poke1: Defense[0], poke2: 10 },
            { rank: '素早さ', poke1: Speed[0], poke2: 100 },
            { rank: '特防', poke1: SpAtk[0], poke2: 20 },
            { rank: '特攻', poke1: SpDef[0], poke2: 10 },
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

    render() {
        return (<div>
            <div className="pokename_title">
                <h1>ポケモンチャート</h1>
            </div>
    <div className="pokename_title">
        <a>ポケモン1名：</a>
        <input type="text" id="pokeName" maxLength="20"/>
        <input type="button" value="Click" onClick={this.getCSV}></input><br/>
        <a>ポケモン2名：</a>
        <input type="text" id="pokeName" maxLength="20"/>
        <input type="button" value="Click" onClick={this.getCSV}></input><br/>
    </div>

    <div className="doryokuchi_title">
        <p>努力値</p><br/>
    </div>

    <div className="input">
    <div className="doryokuchi_label">
        <label>H</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse0" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="0" min="0" max="252" value={this.state.doryokuchi[0]} step="4" id="HPDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus0" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>A</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse1" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="1" min="0" max="252" value={this.state.doryokuchi[1]} step="4" id="AtkDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus1" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>D</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse2" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="2" min="0" max="252" value={this.state.doryokuchi[2]} step="4" id="DefDoryoku" onClick={this.test}/><br/>
        <input type="button" value="-" id="minus2" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>C</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="3" min="0" max="252" value={this.state.doryokuchi[3]} step="4" id="CDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus3" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>B</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse4" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="4" min="0" max="252" value={this.state.doryokuchi[4]} step="4" id="BDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus4" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>S</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse5" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="5" min="0" max="252" value={this.state.doryokuchi[5]} step="4" id="SPDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus5" onClick={this.test} className="boxform" />
    </div>
    </div>

    <div className="input">
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="doryokuchi_title">
        <p>個体値</p><br/>
    </div>
    <div className="doryokuchi_label">
        <label>H</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse00" onClick={this.SetKotaichi} className="boxform" /><br/>
        <input type="number" name="num1" min="0" max="31" value={this.state.kotaichi[0]} step="1" id="HPKotai" OnClick={this.SetKotaichi}/><br/>
        <input type="button" value="-" id="minus00" onClick={this.SetKotaichi} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>A</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="num1" min="0" max="31" value="0" step="1" id="AtkKotai" OnClick="test()"/><br/>
        <input type="button" value="-" id="minus5" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>D</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="num1" min="0" max="31" value="0" step="1" id="DefKotai" OnClick="test()"/><br/>
        <input type="button" value="-" id="minus5" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>C</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="num1" min="0" max="31" value="0" step="1" id="CKotai" OnClick="test()"/><br/>
        <input type="button" value="-" id="minus5" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>B</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="num1" min="0" max="31" value="0" step="1" id="BKotai" OnClick="test()"/><br/>
        <input type="button" value="-" id="minus5" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>S</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>  
        <input type="number" name="num1" min="0" max="31" value="0" step="1" id="SPKotai" OnClick="test()"/><br/>
        <input type="button" value="-" id="minus5" onClick={this.test} className="boxform" />
    </div>
    </div>
    <div>
        <br/>
        <br/>
        <br/>
        {this.Radar()};
        </div>
        </div>);

    }
  }