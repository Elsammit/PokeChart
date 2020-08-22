import React, { Component } from 'react';
import "./pokechart.css";
import Papa from 'papaparse';
import {
    RadarChart, Tooltip, PolarGrid, PolarAngleAxis, Radar
  } from 'recharts';


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
            Poke1St:[0,0,0,0,0,0],
            BaseParam:[0,0,0,0,0,0],
            doryokuchi:[0,0,0,0,0,0],
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
            if(PokeNum === 1){
                var Name = document.getElementById("pokeName").value;
                for(var i=1;i<result.length;i++){
                    if(result[i]["ポケモン名"] === Name){
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
                this.SettingParam().then(() =>{
                    console.log("finish");
                    resolve("0");
                })
                
            }
        });
    }

    SetDoryokuchi = (e) =>{
        var copy = this.state.doryokuchi.slice();
        var checkMax = 0;
        for(var i=0;i<copy.length;i++){
            checkMax = checkMax + copy[i];
        }

        if(e.target.id.match(/pluse/)){
            if(copy[Number(e.target.id.substr(-1))] < 252 && checkMax < 510){
                copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) + 4;
            }
        }else{
            if(copy[Number(e.target.id.substr(-1))] > 4){
                copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) - 4;
            }
            
        }
        this.setState({
            doryokuchi:copy
        })
        this.SettingParam().then(() => {
            console.log("finish");
        })
        
    }

    SetKotaichi = (e) =>{
        var copy = this.state.kotaichi.slice();
        if(e.target.id.match(/pluse/)){
            if(copy[Number(e.target.id.substr(-1))] <31){
                copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) + 1;
            }
        }else{
            if(copy[Number(e.target.id.substr(-1))] > 0){
                copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) - 1;
            }
            
        }
        this.setState({
            kotaichi:copy
        })
        this.SettingParam().then(() =>{
            console.log("finish");
            return;
        })
    }

    SettingParam = () =>{
        return new Promise((resolve, reject) =>{
            var Param = ["HP", "Atk", "Def", "SP", "B", "C"];
        
            (async () => {
                for(var i=0;i<Param.length;i++){
                    await this.CalcParam(Param[i], i);
                }
            })().catch(error => console.error(error));

            console.log("bbb");
            resolve("bbb");
        })
    }


    CalcParam = (IdName, Num) =>{
        return new Promise((resolve, reject) =>{
            var DoryokuID = IdName + "Doryoku";
            var KotaiID = IdName + "Kotai";
            console.log("DoryokuID" + DoryokuID +" KotaiID:" + KotaiID);

            if(document.getElementById(DoryokuID) === null || document.getElementById(KotaiID) === null ){
                console.log("doryoku null !!");
                resolve(-1);
            }

            var doryokuPoint = document.getElementById(DoryokuID).value;
            var KotaiPoint = document.getElementById(KotaiID).value;
        
            var copySt = this.state.Poke1St.slice();
            var BaseParam = this.state.BaseParam.slice();

            copySt[Num] = BaseParam[Num];
            copySt[Num] = copySt[Num] +Number(KotaiPoint/2);

            if(doryokuPoint > 0){
                copySt[Num] = copySt[Num] + Number((doryokuPoint - 4)/8);
            }

            console.log("copySt[Num]:"+copySt[Num]);

            this.setState({
                Poke1St:copySt
            })
            resolve(1);
        })
    }

    Radar = () =>{

        const {HP} = this.state;
        const {Attack} = this.state;
        const {Defense} = this.state;
        const {Speed} = this.state;
        const {SpAtk} = this.state;
        const {SpDef} = this.state;
        const {Poke1St} = this.state;

        const dataRadar = [
            { rank: 'HP', poke1: Poke1St[0], poke2: HP[1] },
            { rank: '攻撃', poke1: Poke1St[1], poke2: Attack[1] },
            { rank: '防御', poke1: Poke1St[2], poke2: Defense[1] },
            { rank: '素早さ', poke1: Poke1St[3], poke2: Speed[1] },
            { rank: '特防', poke1: Poke1St[4], poke2: SpDef[1] },
            { rank: '特攻', poke1: Poke1St[5], poke2: SpAtk[1] },
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
                    <input type="button" value="+" id={Plus} onClick={this.SetDoryokuchi} className="boxform" /><br/>
                    <input type="number" name="doryoku" min="0" max="252" value={doryokuchi} id={doryokuchiID} onChange={this.SetDoryokuchi} /><br/>
                    <input type="button" value="-" id={Minus} onClick={this.SetDoryokuchi} className="boxform" />
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
                    <input type="number" name="num1" min="0" max="310" value={Kotaichi} step="1" id={KotaichiID} onChange={this.SetKotaichi} /><br/>
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
            <div className="ParamWaku">
            <div className="pokename_title">
                <a>ポケモン名：</a>
                <input type="text" id="pokeName" maxLength="20"/>
                <input type="button" value="Click" onClick={() => this.getCSV(1)}></input><br/>
            </div>
    
           
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