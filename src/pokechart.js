import React, { Component } from 'react';
import "./pokechart.css";

export default class Cooking extends Component  {
    constructor (props) {
        super(props);
        this.state = {
            location:0,
            hitflg:true,
            hitpoint:30,
            value:["0","0","0","0","0","0"],
            point:0
        };
    }

    test = (e) =>{
        var copy = this.state.value.slice();
        if(e.target.id.match(/pluse/)){
            copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) + 4;
        }else{
            copy[Number(e.target.id.substr(-1))] = Number(copy[Number(e.target.id.substr(-1))]) - 4;
        }
        console.log("test:"+e.target.name);
        console.log(e.target);
        this.setState({
            value:copy
        })
    }

    render() {
        return (<div>
            <div>
                <meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8" />
                <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
                <h1>ポケモンチャート</h1>
            </div>
            <div>
    <p>ポケモン名</p>
    <input type="text" id="pokeName" value="" maxlength="20"/>
    <input type="button" value="Click" onClick="getCSV(1)"></input>
    <div className="doryokuchi_title">
        <p>努力値</p><br/>
    </div>
    <div className="input">
    <div className="doryokuchi_label">
        <label>H</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse0" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="0" min="0" max="252" value={this.state.value[0]} step="4" id="HPDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus0" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>A</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse1" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="1" min="0" max="252" value={this.state.value[1]} step="4" id="AtkDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus1" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>D</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse2" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="2" min="0" max="252" value={this.state.value[2]} step="4" id="DefDoryoku" onClick={this.test}/><br/>
        <input type="button" value="-" id="minus2" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>C</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse3" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="3" min="0" max="252" value={this.state.value[3]} step="4" id="CDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus3" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>B</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse4" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="4" min="0" max="252" value={this.state.value[4]} step="4" id="BDoryoku" onClick={this.test} /><br/>
        <input type="button" value="-" id="minus4" onClick={this.test} className="boxform" />
    </div>
    <div className="doryokuchi_label">
        <label>S</label>
    </div>
    <div className="doryokuchi">
        <input type="button" value="+" id="pluse5" onClick={this.test} className="boxform" /><br/>
        <input type="number" name="5" min="0" max="252" value={this.state.value[5]} step="4" id="SPDoryoku" onClick={this.test} /><br/>
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