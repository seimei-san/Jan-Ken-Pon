'use stric';




// ################ at loading window ############################
window.addEventListener('load', () => {
    if (localStorage.getItem('jankenpon')) {   // if User Info exists, Load the exsiting User Info in Local Storage
      let jankenpon_json = loadUserInfo();
      let user_name = jankenpon_json["name"];
      let round = jankenpon_json['count'];
      let div_name = document.querySelector(".user_name");
      div_name.innerHTML = user_name;
      generateSpeakTextDuringChallenge(user_name);
      let omae_point = loadUserPoints(jankenpon_json);
      if (round === max_round) {
        // Reached Max number of Rounds (5) so that Omae is asked Challenge Again?
        displayAtMaxRound(omae_point["omae_win"], user_name, omae_point["omae_point"], omae_point["oresama_point"]);
        if (omae_point['omae_win']) {
          insertWinnerLogo('omae');
        } else {
          insertWinnerLogo('oresama');
        }
      } else {
        // Not reached Max number of Rounds (5) so that Omae can still chalelnge
        displayNotAtMaxRound();    
      }
    } else {
      setLocalStrageByJson(default_jankenpon_json);  // if User Info not exists, load the intial user info
      loadUserPoints(loadUserInfo());
      displaySpeak(html_oresama_speak1, 'oresama_text1',"オマエは誰だ？")
      .then(() => {
        displaySpeak(html_oresama_speak2, 'oresama_text2',"名前を入れろ！<br>始めるぞ！")
        .then(() => {
          const div_controller = document.getElementById('controller');
          div_controller.insertAdjacentHTML('beforeend', html_start_box);

        })
      }).catch (() => {
        console.log('FAILED')
      });
  };
  }
);


// ######## start Jan Ken Pon and generate Oresama Gu/Choki/Pa ########
// ######## Executed by onclick = challengeJankenpon in HTML #######
function challengeJankenpon() {   
  oresama_timestamp = 0;
  removeGuChokiPa();
  removeTalks();
  oresama_result = Math.ceil(Math.random() * 3);
  const main_body = document.getElementById('body_main');
  const div_controller = document.getElementById('controller');
  removeBox('challenge_box').then(() => {
    div_controller.insertAdjacentHTML('beforeend', html_gu_choki_Pa_box);
    shout_jankenpon('body_main', html_jan, 'shout_jan', 'jan.mp4')
    .then(() => shout_jankenpon('body_main', html_ken, 'shout_ken', 'ken.mp4'))
    .then(() => {
      if (oresama_result === 1) {
        main_body.insertAdjacentHTML('beforeend', html_oresama_gu);        
      } else if (oresama_result === 2) {
        main_body.insertAdjacentHTML('beforeend', html_oresama_choki);        
      } else {
        main_body.insertAdjacentHTML('beforeend', html_oresama_pa);        
      }
      oresama_timestamp = performance.now();
      shout_jankenpon('body_main', html_pon, 'shout_pon', 'pon.mp4')})
    .catch(() => console.log('FAILED JANKENPON'));
  })
}


// ######## Response to Oresama Gu/Choki/Pa and generate Omae Gu/Choki/Pa ########
// ######## Executed by onclic = omaeGuChokiPa in THML  ###############
function omaeGuChokiPa(omae_result) {
  const omae_timestamp = performance.now();

  let gap_timestamp = omae_timestamp - oresama_timestamp;
  const main_body = document.getElementById('body_main');
  if (omae_result === 1) {
    main_body.insertAdjacentHTML('beforeend', html_omae_gu);
  } else if (omae_result === 2) {
    main_body.insertAdjacentHTML('beforeend', html_omae_choki);
  } else {
    main_body.insertAdjacentHTML('beforeend', html_omae_pa);
  }
  removeBox('gu_choki_pa_box')
  .then(() => {
    displayNotAtMaxRound();
    if (gap_timestamp > atodashi_limit && oresama_timestamp != 0) {   // Warn Atodashi 
      main_body.insertAdjacentHTML('beforeend', html_atodashi_no);
      displaySpeak(html_oresama_speak1, 'oresama_text1', '後出しはなぁ、<br>ダメダ〜メ！');
    } else {
      let winner = judge_result(oresama_result, omae_result);
      let jankenpon_json = loadLocalStorage();
      let user_name = jankenpon_json['name'];
      let round = jankenpon_json['count'];
      if (winner === 'omae') {
        round ++;
        let key = 'point_round' + round;
        updateLocalStorage(key, 1);
        updateLocalStorage('count', round);
        updateScoreBoard(round, 1);
        let omae_win_speak = selectSpaakTextDuringChallegne('omae');
        if (round < 5) {
          // displaySpeak(html_oresama_speak1, 'oresama_text1', `う〜ん、、、<br>${user_name}<br>なかなかやるなァ`)
          displaySpeak(html_oresama_speak1, 'oresama_text1', omae_win_speak[1])
          .then(() => {
            displaySpeak(html_omae_speak1, 'omae_text1', omae_win_speak[0])
          })
        } else {
          removeBox('challenge_box')
          .then (() => {
            let omae_point = loadUserPoints(loadLocalStorage());
            displayAtMaxRound(omae_point["omae_win"], user_name, omae_point["omae_point"], omae_point["oresama_point"] );
            insertWinnerLogo('omae');
          })
        }
      } else if (winner === 'oresama') {  
        round ++;
        let key = 'point_round' + round;
        updateLocalStorage(key, -1);
        updateLocalStorage('count', round);
        updateScoreBoard(round, -1);
        let oresama_win_speak = selectSpaakTextDuringChallegne('oresama');
        if (round < 5) {
          displaySpeak(html_oresama_speak1, 'oresama_text1', oresama_win_speak[0])
          // displaySpeak(html_oresama_speak1, 'oresama_text1', `ハッハッハッ<br>顔を洗って<br>出直してこい！`)
          .then (() => {
            displaySpeak(html_omae_speak1, 'omae_text1', oresama_win_speak[1]);
          })
        } else {
          removeBox('challenge_box')
          .then(() => {
            let omae_point = loadUserPoints(loadLocalStorage());
            displayAtMaxRound(omae_point["omae_win"], user_name, omae_point["omae_point"], omae_point["oresama_point"] );
            insertWinnerLogo('oresama');
          })
        }
      } else {  // Aiko 
        displaySpeak(html_oresama_speak1, 'oresama_text1', `${user_name}<br>しぶといヤツだ！`)
        .then (() => {
          displaySpeak(html_oresama_speak2, 'oresama_text2', `勝負を続けろ！`);
        })
        displaySpeak(html_omae_speak1, 'omae_text1',"・・・・")
      }
    }
  }).catch((e) => {
    console.log(e, 'ERROR in Gu Choki Pa');
  })
}



// ###################### Start Jankenpon ##########################
// ########### Executed by onclick = startJankenpon in HTML ########
function startJankenpon() {
  const input_user_name = document.getElementById('input_user_name');
  const div_start_box = document.getElementById('start_box');
  const regex = new RegExp(/^[^\x20-\x7e]{1,5}$/);
  user_name = input_user_name.value;
  if (regex.test(user_name) === false) {  // User Name not satisfy the pattern
    const dialog = document.getElementById('dialog');
    const btn_yes = document.getElementById('btn_yes');
    dialog.style.display = 'block';    // display the dialog box
    btn_yes.addEventListener('click', function() {
      dialog.style.display = 'none';
    })
    input_user_name.value = "";
  } else {
    updateLocalStorage('name', user_name);
    generateSpeakTextDuringChallenge(user_name);
    removeTalks();
    removeBox('start_box')
    .then(() => {
      displayNotAtMaxRound();
    }).catch (() => {
      console.log('cannot change the box');
    })
  } 
}

// ########### Challenge Again after Max Round ####################
// ############# Executed by onclick = challengeJankenponAgain in HTML  ###############
function challengeJankenponAgain() {
  const div_sub_title = document.getElementById('sub_title');  
  div_sub_title.style.color = "white";
  div_sub_title.innerHTML = '勝つのはどいつだ？？？'
  removeGuChokiPa();
  removeTalks();
  let jankenpon_json = loadLocalStorage();
  let user_name = jankenpon_json['name'];
  jankenpon_json = default_jankenpon_json;
  jankenpon_json['name'] = user_name;
  setLocalStrageByJson(jankenpon_json);
  loadUserPoints(jankenpon_json);
  
  removeBox('again_box')
  .then (() => {
    displayNotAtMaxRound();
  })
}

// ########################### QUIT JANKENPON ###############################
// ####### Executed by onclick = quitJankenponFromChallenge in HTML  #############
function quitJankenponFromChallenge() {
  quitJankenpon('challenge_box');
}

// ####### Executed by onclick = quitJankenponFromAgain in HTML  #################
function quitJankenponFromAgain() {
  quitJankenpon('again_box');
}


// ################# Quit Jankenpon  #######################
// Promise 地獄　WWWW
function quitJankenpon(id) {
  const div_sub_title = document.getElementById('sub_title');  
  div_sub_title.style.color = "white";
  div_sub_title.innerHTML = '勝つのはどいつだ？？？'
  localStorage.removeItem('jankenpon');
  removeGuChokiPa();
  removeTalk('oresama_speak1')
  .then(() => {
    removeTalk('oresama_speak2')
    .then (() => {
      removeTalk('omae_speak1')
      .then (() => {
        removeTalk('omae_speak2')
        .then (() => {
          removeBox(id).then(() => {
            // setLocalStrage('オマエ', 0, 0, 0, 0, 0, 0);  // if User Info not exists, load the intial user info
            setLocalStrageByJson(default_jankenpon_json);  // if User Info not exists, load the intial user info
            loadUserPoints(loadUserInfo());
            displaySpeak(html_oresama_speak1, 'oresama_text1',"オマエは誰だ？")
            .then(() => {
              displaySpeak(html_oresama_speak2, 'oresama_text2',"名前を入れろ！<br>始めるぞ！")
              .then(() => {
                const div_controller = document.getElementById('controller');
                div_controller.insertAdjacentHTML('beforeend', html_start_box);
          
              })
            }) //.catch('cannot remove');
          })
        })
      })
    })
  })

}


