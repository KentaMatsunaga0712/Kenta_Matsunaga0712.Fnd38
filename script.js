'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//HTMLとつなげる　値が変化しないのでconst指定
const scoredisplay =  document.getElementById("score");
const timeinfo = document.getElementById("time");
const startbutton= document.getElementById("start");
const holes =document.querySelectorAll(".hole");

//ゲーム中変化する値　グローバル
let currentscore = 0;//現在のスコア
let timeleft= 10;//残り時間
let hitholeid = null;//モグラが出てるID
let gametimeid = null;//タイマーID
let moletimeid = null;//モグラタイマー
let gameactive = false;//ゲーム中かどうか

//モグラクリックしたら点数を入れる　一番下にイベントリスナーいれる　
function watchmole (event){                                  //eventの引数はメモリー上に残っている　イメージできなくなったらMDN
    if (!gameactive||event.target.parentNode.id !== hitholeid){
        return;                                               //ゲームがアクティブではないもしくは正しいモグラをクリックしてない場合なにもしない
    }
    currentscore++;//現在のスコアに+1
    scoredisplay.textContent=currentscore;//scoredisplayに表示更新
    hidemole();//もぐらをリセット
}

//モグラリセット用
function hidemole (){
    if (hitholeid){
        const currenthole= document.getElementById(hitholeid);
        currenthole.classList.remove("up");//要素から削除
        hitholeid=null;//位置リセット
    }
}

//モグラをだす　ランダム
function showrandommole (){
hidemole();
const random= Math.floor(Math.random()*holes.length);//ランダムに出す　
const selecthole= holes[random];
selecthole.classList.add("up");//もぐらが出るクラス追加
hitholeid= selecthole.id;//出現もぐらのidを記録
}

//タイマー
function countdowen(){
    timeleft--;//１ｓごと減らす
    timeinfo.textContent = timeleft;//表示の更新

    if(timeleft <=0){
        endgame();//0になったらendgame 起動
    }
}

//ゲーム開始
function startgame(){
    if(gameactive){
        return;
    }
    gameactive=true;                       //ここからゲーム開始時の状態にする
    currentscore= 0;
    timeleft =10;
    scoredisplay.textContent= currentscore;
    timeinfo.textContent = timeleft;
    startbutton.disabled=true;             //ＣＳＳで設定したボタン無効化を起動
    startbutton.textContent = "動いてます！";//文字の更新
    hidemole();//モグラリセット
    moletimeid = setInterval(showrandommole,1000);//時間設定　setIntervalで時間設定　1000で1秒
    gametimeid = setInterval(countdowen , 1000);
}

//ゲーム終了
function endgame (){
    gameactive = false;
    clearInterval(moletimeid);//モグラタイマークリア
    clearInterval(gametimeid);//タイマークリア
    hidemole();//もぐらリセット
    alert(`ゲーム終了！あなたのスコアは${currentscore}点です！`)//ポップアップ
    startbutton.disabled = false;//元に戻す
    startbutton.textContent ="はじめる！";
}

//イベントリスナー
startbutton.addEventListener("click" , startgame);//クリックしたらstart
holes.forEach(hole =>{
    hole.addEventListener("click" , watchmole);//holes.forEach(fanction(hole){hole.addEventListener("click",watchmole);});高階関数だとこんな感じ
});
