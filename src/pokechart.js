import React, { Component } from 'react';
import "./pokechart.css";
import Papa from 'papaparse';
import pokecsv from './pokemon_status.csv';
import {
    RadarChart, Tooltip, Legend, PolarGrid, PolarAngleAxis, Radar
  } from 'recharts';
//import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js";


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
            doryokuchi:["0","0","0","0","0","0"],
            csvfile:undefined,
            point:0
        };
        //this.getCSV(1); //最初に実行される
    }

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
    convertCSVtoArray = (str, PokeNum) =>{ // 読み込んだCSVデータが文字列として渡される
        return new Promise(resolve =>{
            var result = str;

            PokeNum = 1;
            if(PokeNum == 1){
                var Name = document.getElementById("pokeName").value;
                for(var i=1;i<result.length;i++){
                    //console.log(result[i]["ポケモン名"])
                    if(result[i]["ポケモン名"] == Name){
                        console.log("Get Name");
                        Name = result[i]["ポケモン名"]
                        Attack = result[i]["こうげき"]
                        Defense = result[i]["ぼうぎょ"]
                        HP = result[i]["HP"]
                        SpAtk = result[i]["とくこう"]
                        SpDef = result[i]["とくぼう"]
                        Speed = result[i]["すばやさ"]
                        console.log("HP:"+HP+",攻撃"+Attack+",防御:"+Defense);
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
            var buf;
            var reqq = new XMLHttpRequest();
            reqq.open("get", "pokemon_status.csv", true); // アクセスするファイルを指定
            reqq.send(null); // HTTPリクエストの発行
            
            // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
            reqq.onload = ()=>{
                //console.log("test:"+reqq.responseText);
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
    }

    HPDoyoku = () =>{
        var HPdoryoku = document.getElementById("HPDoryoku").value;
        var HPKotai = document.getElementById("HPKotai").value;
        var HPdoryoku2 = document.getElementById("HPDoryoku2").value;
        var HPKotai2 = document.getElementById("HPKotai2").value;
        
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
    
    AtkDoyoku = () =>{
        var Atkdoryoku = document.getElementById("AtkDoryoku").value;
        var AtkKotai = document.getElementById("AtkKotai").value;
        var Atkdoryoku2 = document.getElementById("AtkDoryoku2").value;
        var AtkKotai2 = document.getElementById("AtkKotai2").value;
    
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
    
    DefDoyoku = () =>{
        var DefDoryoku = document.getElementById("DefDoryoku").value;
        var DefKotai = document.getElementById("DefKotai").value;
        var DefDoryoku2 = document.getElementById("DefDoryoku2").value;
        var DefKotai2 = document.getElementById("DefKotai2").value;
    
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
        var buf = 10;

    const dataRadar = [
        { rank: 'HP', poke1: HP, poke2: 100 },
        { rank: '攻撃', poke1: Attack, poke2: 100 },
        { rank: '防御', poke1: Defense, poke2: 10 },
        { rank: '素早さ', poke1: Speed, poke2: 100 },
        { rank: '特防', poke1: SpAtk, poke2: 20 },
        { rank: '特攻', poke1: SpDef, poke2: 10 },
        ];
        console.log("call Radar");
  return(<RadarChart // レーダーチャートのサイズや位置、データを指定
    height={400} //レーダーチャートの全体の高さを指定
    width={500} //レーダーチャートの全体の幅を指定
    cx="50%" //要素の左を基準に全体の50%移動
    cy="50%" //要素の上を基準に全体の50%移動
    data={dataRadar} //ここにArray型のデータを指定
  >
    <PolarGrid /> // レーダーのグリッド線を表示
    <PolarAngleAxis
      dataKey="rank" //Array型のデータの、数値を表示したい値のキーを指定
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
  </RadarChart>);
    }

    render() {
        return (<div>
            <div>
                <h1>ポケモンチャート</h1>
            </div>
            <div>
    <p>ポケモン名</p>
    <input type="text" id="pokeName" maxLength="20"/>
    <input type="button" value="Click" onClick={this.getCSV}></input>
    <div className="doryokuchi_title">
        <p>努力値</p><br/>
    </div>
    {this.Radar()}
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
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="num1" min="0" max="31" value="0" step="1" id="HPKotai" OnClick="test()"/><br/>
        <input type="button" value="-" id="minus3" onClick={this.test} className="boxform" />
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
  </div>
        </div>);

    }
  }