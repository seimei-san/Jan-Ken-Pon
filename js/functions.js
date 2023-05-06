'user stricgt';



// #############   Who win ? ##################
function judge_result(oresama_result, omae_result) {
  let winner = "oresama";
  //  only cases for omae = win
  // gu=1, choki=2, pa=3
  //     oresama        omae
  //       1             3 
  //       2             1
  //       3             2
  if (oresama_result === 1 && omae_result === 3) {
    winner = 'omae';
  } else if (oresama_result === 2 && omae_result === 1) {
    winner = 'omae';
  } else if (oresama_result === 3 && omae_result === 2) {
    winner = 'omae';
  } else if (oresama_result === omae_result) {
    // アイコ
    winner = 'aiko'
  } 
  return winner;
}


//  ############## randomly select Speak Text during Challenge ################
function selectSpaakTextDuringChallegne(winner) {
  const winner_number = Math.floor(Math.random() * 4);
  const loser_number = Math.floor(Math.random() * 4);
  if (winner === 'oresama') {
    return [oresama_win_speak_text[winner_number], omae_lose_speak_text[loser_number]];
  } else if (winner === 'omae') {
    return [omae_win_speak_text[winner_number], oresama_lose_speak_text[loser_number]];
  }

}

// #############   generate Speak Text during Challenge ##############
function generateSpeakTextDuringChallenge(user_name) {
  let oresama_win_speak1 = "ワッハッハー<br>顔を洗って<br>出直しきな！";
  let oresama_win_speak2 = user_name + "<br>オレ様には勝てないぜ！";
  let oresama_win_speak3 = user_name + "<br>おとなしく帰って<br>寝てなさい！";
  let oresama_win_speak4 = "オレ様に勝つなんざ<br>１０年早いぜ！<br>" + user_name;
  let omae_lose_speak1 = "・・・・・";
  let omae_lose_speak2 = "くっそ！";
  let omae_lose_speak3 = "ふんっ、<br>いつまで<br>笑っていられるかな？";
  let omae_lose_speak4 = "まだ、<br>勝負はついていないぜ！";
  let oresama_lose_speak1 = user_name + "<br>なかなかやるなぁ、、";
  let oresama_lose_speak2 = "くっそー、<br>頭にきたぜ！";
  let oresama_lose_speak3 = "まだまだ、<br>" + user_name + "<br>覚悟しな！";
  let oresama_lose_speak4 = "う〜〜〜ん<br>ヤバイかも、、";
  let omae_win_speak1 = "フッフッフッ";
  let omae_win_speak2 = "オマエも<br>大したことねなぁ";
  let omae_win_speak3 = "オレはクールだぜ！";
  let omae_win_speak4 = "この勝負、<br>もらったぜ！";
  oresama_win_speak_text = [oresama_win_speak1, oresama_win_speak2, oresama_win_speak3, oresama_win_speak4];
  omae_lose_speak_text = [omae_lose_speak1, omae_lose_speak2, omae_lose_speak3, omae_lose_speak4];
  omae_win_speak_text = [omae_win_speak1, omae_win_speak2, omae_win_speak3, omae_win_speak4];
  oresama_lose_speak_text = [oresama_lose_speak1, oresama_lose_speak2, oresama_lose_speak3, oresama_lose_speak4];
}

// ########################################################
// ############## USER INFO / SCORE BOARD #################
// ########################################################

// ############ Load User Information ######################
function loadUserInfo() {
  let jankenpon_json = loadLocalStorage('jankenpon');
  let user_name = jankenpon_json["name"];
  let div_name = document.querySelector(".user_name");
  div_name.innerHTML = user_name;
  return jankenpon_json;
}

// ################## Set User Points into Header Score Board ################
function loadUserPoints (user_info) {
  let omae_point_sum = 0;
  let omae_point = 0;
  Object.keys(user_info).forEach(function(key){
    if (key.includes('point')) {
      let point = user_info[key];
      omae_point_sum += point;
      let omae_id = 'omae_' + key;  
      let oresama_id = 'oresama_' + key;
      omae_score_box = document.getElementById(omae_id);
      oresama_score_box = document.getElementById(oresama_id);
      if (point === 1) {
        omae_point += point
        omae_score_box.src = 'img/bullet.png';
        oresama_score_box.src = 'img/hole.png';        
      } else if (point === -1) {
        omae_score_box.src = 'img/hole.png';
        oresama_score_box.src = 'img/bullet.png';        
      } else {
        omae_score_box.src = 'img/null.png';
        oresama_score_box.src = 'img/null.png';        
      }
    }
  });
  let omae_win = false;
  if (omae_point_sum > 0) {omae_win = true};
  let oresama_point = max_round - omae_point;
  return {'omae_win': omae_win, 'omae_point': omae_point, 'oresama_point': oresama_point};
}

// ########### Load User Information from Local Strage ##############
function loadLocalStorage() {
  let jankenpon_json = {};
  let jankenpon_json_text = localStorage.getItem('jankenpon');
  jankenpon_json = JSON.parse(jankenpon_json_text);
  return jankenpon_json;
}

// ########### Set User Information to Local Stroage ###############
function setLocalStrage(name, count, round1, round2, round3, round4, round5){
  let jankenpon_json = {'name': name, 'count': count, 'point_round1': round1, 'point_round2': round2, 'point_round3': round3, 'point_round4':round4, 'point_round5': round5};
  let jankenpon_json_text = JSON.stringify(jankenpon_json);
  localStorage.setItem("jankenpon", jankenpon_json_text);
}

// ########### Set User Information to Local Stroage by JSON ###############
function setLocalStrageByJson(jankenpon_json){
  let jankenpon_json_text = JSON.stringify(jankenpon_json);
  localStorage.setItem("jankenpon", jankenpon_json_text);
}

// ########## Update User Information in Local Storage #################
function updateLocalStorage(key, value) {
  let jankenpon_json = loadLocalStorage();
  jankenpon_json[key] = value;
  let user_name = jankenpon_json["name"];
  let div_name = document.querySelector(".user_name");
  div_name.innerHTML = user_name;
  loadUserPoints(jankenpon_json);
  let jankenpon_json_text = JSON.stringify(jankenpon_json);
  localStorage.setItem("jankenpon", jankenpon_json_text);
}

// ############ Update Score Boad per round based on omae result #############
function updateScoreBoard(round, result){
  let key_omae = 'omae_point_round' + round;
  let key_oresama = 'oresama_point_round' + round;
  if (result === 1) {
    document.getElementById(key_omae).src='img/bullet.png';
    document.getElementById(key_oresama).src="img/hole.png";
  } else {
    document.getElementById(key_omae).src='img/hole.png';
    document.getElementById(key_oresama).src="img/bullet.png";
  }
}


// ########################################################
// ################ DISPLAY / INSERTER ####################
// ########################################################

// ########### Display Speaks and Controller Challenge NOT at Max Round 5 #########
function displayNotAtMaxRound(){
  const div_controller = document.getElementById('controller');
  const div_sub_title = document.getElementById('sub_title');  
  div_sub_title.style.color = "whilte";
  div_sub_title.innerHTML = '勝つのはどいつだ？？？'
  div_controller.insertAdjacentHTML('beforeend', html_challenge_box); 

}

// ########## Display Speaks and Controller Again at Max Round 5 ##############
function displayAtMaxRound(omae_win, user_name, omae_point, oresama_point) {
  const div_controller = document.getElementById('controller');
  const div_sub_title = document.getElementById('sub_title');
  if (omae_win) {
    div_sub_title.style.color = "blue";
    div_sub_title.innerHTML = `${omae_point} 対 ${oresama_point} で${user_name}様の勝ち！！！`
    displaySpeak(html_oresama_speak1, 'oresama_text1', `${user_name}様<br>参りました！` )
    .then(() => {
      displaySpeak(html_omae_speak1, 'omae_text1',"フッフッフッ<br>参ったか！")
    }).catch (() => {
      console.log('FAILED')
    });
  } else {
    div_sub_title.style.color = "red";
    div_sub_title.innerHTML = `${omae_point} 対 ${oresama_point} でオレ様の勝ちだ！！！`
    displaySpeak(html_oresama_speak1, 'oresama_text1', "ワッハッハー！<br>オレ様の勝ちだ！" )
    .then(() => {
      displaySpeak(html_omae_speak1, 'omae_text1',"・・・・")
    }).catch (() => {
      console.log('FAILED')
    });
  }
  div_controller.insertAdjacentHTML('beforeend', html_again_box); 
  
}



// ######## Insert Jan/Ken/Pon Image, remove Image, and play Jan/Ken/Pon Voice #######
function shout_jankenpon (parent_id, html, child_id, voice) { 
  return new Promise((resolve, reject) => {
      playVoice(voice);
      displayJanKenPon(parent_id, html, child_id)
      .then(() => {
        let child_elm = document.getElementById(child_id);
        if (child_elm === null) {
            reject('child_elem is not removed');
        } else {
            child_elm.addEventListener('animationend', () => {
                child_elm.remove();
                resolve('child_elem is removed');
            });
        }
      });
  })
}


// ############ insert Jan/Ken/Pon Image ##################
function displayJanKenPon (parent_id, html, child_id, voice) {  
  return new Promise( (resolve, reject) => {
      let parent_elem = document.getElementById(parent_id);
      parent_elem.insertAdjacentHTML('beforeend', html);
      let child_elem = document.getElementById(child_id);

      if (child_elem === null) {
          reject('child_elem is not inserted');
      } else {
          resolve('child_elem is inserted');
      }

  })
}

// ############# Display a Talk  #################
function displaySpeak (html_speak, speaker_text, speak_text) {
  return new Promise ((resolve, reject) => {
    const div_main = document.getElementById('body_main');
    div_main.insertAdjacentHTML('beforeend', html_speak);
    const p_speaker_text = document.getElementById(speaker_text);
    p_speaker_text.innerHTML = speak_text;
    p_speaker_text.addEventListener('animationend', () => {
      resolve('talk_displayed');
    });
  });
}


// ###########  insert Winner's Logo #################
function insertWinnerLogo(winner) {
  let body_main = document.getElementById('body_main');
  body_main.insertAdjacentHTML("beforeend", html_winnder_log);
  let winner_box = document.getElementById('winner_box');
  if (winner === 'oresama') {
    winner_box.style.left = '650px';
  } else {
    winner_box.style.left = '250px';
  }
}



// ########################################################
// #################### REMOVERS ##########################
// ########################################################


// ########### Remove Box by ID  ###################
function removeBox (id) {
  return new Promise((resolve, reject) => {
    const box = document.getElementById(id);
    box.style.animationName = "fadeOut";
    box.style.animationDuration = remove_button_duration;
    box.addEventListener('animationend', () => {
      box.remove();
      resolve('removed BOX');
    })
  })
}



// ########### Remove Gu Choki Pa ##############
function removeGuChokiPa() {
  const oresama_guchokipa = document.getElementById('oresama_guchokipa');
  const omae_guchokipa = document.getElementById('omae_guchokipa');
  const atodashi_no = document.getElementById('atodashi_no');
  const winner_box = document.getElementById('winner_box');
  if (oresama_guchokipa != null) {
    oresama_guchokipa.remove();
  }
  if (oresama_guchokipa != null) {
    omae_guchokipa.remove();
  }
  if (atodashi_no != null) {
    atodashi_no.remove();
  }
  if (winner_box != null) {
    winner_box.remove();
  }
}


// ########### Remove Talk by ID ###################
function removeTalk (id) {
  return new Promise((resolve, reject) => {
    let talk_box = document.getElementById(id);
    if (talk_box === null) {
      resolve('Not Talks Box');
    } else {
      talk_box.style.animationName = "fadeOut";
      talk_box.style.animationDuration = remove_talks_duration;
      talk_box.addEventListener('animationend', () => {
        talk_box.remove();
        resolve("talk box removed");
      })
    }
  })
}




// ########### remove all Talk Boxes #######################
function removeTalks () {
  const oresama_speak1 = document.getElementById('oresama_speak1');
  const oresama_speak2 = document.getElementById('oresama_speak2');
  const omae_speak1 = document.getElementById('omae_speak1');
  const omae_speak2 = document.getElementById('omae_speak2');
  if (oresama_speak1 != null) {
    oresama_speak1.style.animationName = "fadeOut";
    oresama_speak1.style.animationDuration = remove_talks_duration;
    oresama_speak1.addEventListener('animationend', () => {
      oresama_speak1.remove();
    })
  }
  if (oresama_speak2 != null) {
    oresama_speak2.style.animationName = "fadeOut";
    oresama_speak2.style.animationDuration = remove_talks_duration;
    oresama_speak2.addEventListener('animationend', () => {
      oresama_speak2.remove();
    })
  }
  if (omae_speak1 != null) {
    omae_speak1.style.animationName = "fadeOut";
    omae_speak1.style.animationDuration = remove_talks_duration;
    omae_speak1.addEventListener('animationend', () => {
      omae_speak1.remove();
    })
  }
  if (omae_speak2 != null) {
    omae_speak2.style.animationName = "fadeOut";
    omae_speak2.style.animationDuration = remove_talks_duration;
    omae_speak2.addEventListener('animationend', () => {
      omae_speak2.remove();
    })
  }

}

// ########################################################
// #################### MEDIA PLAYER ######################
// ########################################################

// ###########  play a media file #############
function playVoice (voice) { 
  let shout_voice = new Audio('media/' + voice);
  shout_voice.play();
}