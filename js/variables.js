'use streict';

// ########### Common Variables (Begin) #############################
const max_round = 5;
let oresama_result = 0;
let oresama_timestamp = 0;
const atodashi_limit = 500  // ms
const default_jankenpon_json = {'name': 'オマエ' , 'count': 0, 'point_round1': 0, 'point_round2': 0, 'point_round3': 0, 'point_round4': 0, 'point_round5': 0}
// const default_jankenpon_json = {'name': 'オマエ' , 'count': 3, 'point_round1': 1, 'point_round2': 1, 'point_round3': -1, 'point_round4': 0, 'point_round5': 0}
// ########### HTMLs for inserting to MAIN #################
const html_jan = '<div class="shout_jankenpon" id="shout_jan"><img src="img/jan.png" alt=""></div>';
const html_ken = '<div class="shout_jankenpon" id="shout_ken"><img src="img/ken.png" alt=""></div>';
const html_pon = '<div class="shout_jankenpon" id="shout_pon"><img src="img/pon.png" alt=""></div>';

const html_oresama_speak1 = '<div class="oresama_speak1" id="oresama_speak1"><p class="oresama_text1" id="oresama_text1"></p></div>'
const html_oresama_speak2 = '<div class="oresama_speak2" id="oresama_speak2"><p class="oresama_text2" id="oresama_text2"></p></div>'
const html_omae_speak1 = '<div class="omae_speak1" id="omae_speak1"><p class="omae_text1" id="omae_text1"></p></div>'
const html_omae_speak2 = '<div class="omae_speak2" id="omae_speak1"><p class="omae_text2" id="omae_text2"></p></div>'

const html_oresama_gu = '<div class="oresama_guchokipa" id="oresama_guchokipa"><img src="img/oresama_gu.png" alt="Jankenpon Gu"></div>';
const html_omae_gu = '<div class="omae_guchokipa" id="omae_guchokipa"><img src="img/omae_gu.png" alt="Jankenpon Gu"></div>';

const html_oresama_choki = '<div class="oresama_guchokipa" id="oresama_guchokipa"><img src="img/oresama_choki.png" alt="Jankenpon Choki"></div>';
const html_omae_choki = '<div class="omae_guchokipa" id="omae_guchokipa"><img src="img/omae_choki.png" alt="Jankenpon Choki"></div>';

const html_oresama_pa = '<div class="oresama_guchokipa" id="oresama_guchokipa"><img src="img/oresama_pa.png" alt="Jankenpon Pa"></div>';
const html_omae_pa = '<div class="omae_guchokipa" id="omae_guchokipa"><img src="img/omae_pa.png" alt="Jankenpon Pa"></div>';

const html_atodashi_no = '<div class="atodashi_no" id="atodashi_no"><img src="img/atodashi_no.png" alt="Jankenpon Atodaashi No"></div>';

const html_winnder_log = '<div class="winner_box" class="winner_box" id="winner_box"><img src="img/winner_s.png" alt=""></div>'


// ########### HTMLs for inserting to CONTROLLER ############
const html_start_box = '<div class="start_box" id="start_box"><div class="user_name_box"><label for="input_user_name">オマエの名前<br>（全角5文字まで）</label><input type="text" class="input_user_name" id="input_user_name"></div><div class="btn_start_box"><img src="img/btn_start.png" alt="Janken Start" class="btn_start" onclick="startJankenpon()"></div><div class="controller_space_box"></div></div>'
const html_challenge_box = '<div class="challenge_box" id="challenge_box"><div class="controller_space_box"></div><div class="btn_challenge_box"><img src="img/btn_challenge.png" alt="Janken Challenge" class="btn_challenge" onclick="challengeJankenpon()"></div><div class="quit_jankenpon"><img src="img/btn_end.png" alt="Quit Jankenpon" class="btn_quit" onclick="quitJankenponFromChallenge()"></div></div>'
const html_again_box = '<div class="again_box" id="again_box"><div class="controller_space_box"></div><div class="btn_again_box"><img src="img/btn_again.png" alt="Janken again" class="btn_again" onclick="challengeJankenponAgain()"></div><div class="quit_jankenpon"><img src="img/btn_end.png" alt="Quit Jankenpon" class="btn_quit" onclick="quitJankenponFromAgain()"></div></div>'
const html_gu_choki_Pa_box = '<div class="gu_choki_pa_box" id="gu_choki_pa_box"><div class="controller_space_box"></div><div class="btn_gu_box"><img src="img/btn_gu_s.png" alt="Gu" class="btn_guchokipa" onclick="omaeGuChokiPa(1)"></div><div class="btn_choki_box"><img src="img/btn_choki_s.png" alt="Choki" class="btn_guchokipa" onclick="omaeGuChokiPa(2)"></div><div class="btn_pa_box"><img src="img/btn_pa_s.png" alt="Pa" class="btn_guchokipa" onclick="omaeGuChokiPa(3)"></div><div class="controller_space_box"></div></div>';

// ############ Animation Parameters ##############
const remove_talks_duration = '1.0s';
const remove_button_duration = '0.8s';

// ############ Speak Texts during Challenge #################
let oresama_win_speak_text = "";
let omae_lose_speak_text = "";
let oresama_lose_speak_text = "";
let omae_win_speak_text = "";

// ########### Common Variables (End)  #############################
