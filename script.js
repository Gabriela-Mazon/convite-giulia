// Preencha estes links quando os detalhes da festa estiverem definidos.
const CONFIG = {
  locationUrl: 'https://maps.app.goo.gl/Kx4zQCqEYLbQSMhm8',
  rsvpUrl: '' // Exemplo: https://wa.me/5511999999999?text=Quero%20confirmar%20minha%20presenca
};
const opening = document.querySelector('#opening');
const invitation = document.querySelector('#invitation');
const dialog = document.querySelector('#details-dialog');
let openingInProgress = false;
async function openInvitation() {
  if (openingInProgress) return;
  openingInProgress = true;
  // Solicita a reprodução no próprio clique e sincroniza a abertura com o áudio.
  startMusic();
  if (!musicPlaying && !musicFailed) {
    await new Promise(resolve => {
      musicStartResolve = resolve;
      musicStartTimer = setTimeout(finishMusicStart, 4000);
    });
  }
  // A abertura solicitada pelo visitante sempre tem uma transição visível.
  // A preferência de movimento reduzido continua valendo para brilhos decorativos.
  const reducedMotion = false;
  const envelope = document.querySelector('.envelope');
  const start = envelope.getBoundingClientRect();
  opening.classList.add('animating');
  Object.assign(envelope.style, {position:'fixed',left:`${start.left}px`,top:`${start.top}px`,width:`${start.width}px`,height:`${start.height}px`,margin:'0'});
  invitation.hidden = false;
  invitation.inert = true;
  invitation.classList.add('being-opened');
  window.scrollTo({top:0,behavior:'instant'});
  const destination = document.querySelector('.invitation-card').getBoundingClientRect();
  if (!reducedMotion) {
    await envelope.animate([
      {left:`${start.left}px`,top:`${start.top}px`,width:`${start.width}px`,height:`${start.height}px`},
      {left:`${destination.left}px`,top:`${destination.top}px`,width:`${destination.width}px`,height:`${destination.height}px`}
    ],{duration:1600,easing:'cubic-bezier(.22,.68,.25,1)',fill:'forwards'}).finished;
  }
  Object.assign(envelope.style,{left:`${destination.left}px`,top:`${destination.top}px`,width:`${destination.width}px`,height:`${destination.height}px`});
  envelope.getAnimations().forEach(animation=>animation.cancel());
  opening.classList.add('unfolding');
  if (!reducedMotion) {
    // As abas chegam a 180 graus e ficam abertas por um instante antes de sumir.
    await new Promise(resolve=>setTimeout(resolve,4800));
    await opening.animate([{opacity:1},{opacity:0}],{duration:1000,fill:'forwards'}).finished;
  }
  opening.hidden = true;
  opening.getAnimations().forEach(animation=>animation.cancel());
  invitation.inert = false;
  invitation.classList.remove('being-opened');
  document.querySelector('.location').focus({preventScroll:true});
  openingInProgress = false;
}
document.querySelector('#open-invitation').addEventListener('click',openInvitation);
document.querySelector('#open-label').addEventListener('click',openInvitation);
document.querySelector('#replay').addEventListener('click',()=>{
  pauseMusic();
  document.querySelector('#music-toggle').hidden = true;
  invitation.hidden=true; opening.hidden=false; opening.classList.remove('leaving','unfolding','animating');
  document.querySelector('.envelope').removeAttribute('style');
  window.scrollTo({top:0,behavior:'instant'});
  document.querySelector('#open-invitation').focus({preventScroll:true});
});
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>{
  const location = button.dataset.action === 'location';
  const url = location ? CONFIG.locationUrl : CONFIG.rsvpUrl;
  if(url){window.open(url,'_blank','noopener,noreferrer');return;}
  document.querySelector('#dialog-title').textContent=location?'O encontro tem lugar':'Sua presença é especial';
  document.querySelector('#dialog-copy').textContent=location?'A festa será na LaBelle Maison, em 20 de novembro, às 21:00. O endereço completo será adicionado assim que estiver definido.':'O canal de confirmação será adicionado em breve. Esta é uma prévia do convite.';
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-ok').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
const particles=document.querySelector('#sparkles');
for(let i=0;i<42;i++){const dot=document.createElement('i');dot.className='spark';dot.style.left=`${Math.random()*100}%`;dot.style.top=`${Math.random()*100}%`;dot.style.setProperty('--duration',`${4+Math.random()*6}s`);dot.style.setProperty('--delay',`${-Math.random()*10}s`);particles.append(dot);}
const openingLights = document.querySelector('#opening-lights');
for(let i=0;i<34;i++){
  const light=document.createElement('i');
  light.className=i%5===0?'opening-glint':'opening-dust';
  light.style.left=`${Math.random()*100}%`;
  light.style.top=`${Math.random()*100}%`;
  light.style.setProperty('--duration',`${4+Math.random()*5}s`);
  light.style.setProperty('--delay',`${-Math.random()*9}s`);
  openingLights.append(light);
}
for(let i=0;i<3;i++){
  const trail=document.createElement('i');trail.className='light-trail';
  trail.style.top=`${15+i*30}%`;
  trail.style.setProperty('--duration',`${11+i*3}s`);
  trail.style.setProperty('--delay',`${-i*4}s`);
  openingLights.append(trail);
}

// Player preparado fora do main para carregar enquanto o envelope está fechado.
const musicButton = document.querySelector('#music-toggle');
const musicLabel = document.querySelector('#music-button-label');
const musicStatus = document.querySelector('#music-status');
let musicPlayer;
let musicReady = false;
let musicWanted = false;
let musicPlaying = false;
let musicFailed = false;
let musicStartResolve;
let musicStartTimer;
function finishMusicStart() {
  clearTimeout(musicStartTimer);
  if (musicStartResolve) {
    const resolve = musicStartResolve;
    musicStartResolve = undefined;
    resolve();
  }
}
function showMusicState(label, status) {
  musicLabel.textContent = label;
  musicButton.setAttribute('aria-label', label);
  musicStatus.textContent = status;
}
function playMusic() {
  if (!musicReady || musicFailed) return;
  musicWanted = true;
  musicPlayer.playVideo();
}
function startMusic() {
  musicButton.hidden = false;
  musicWanted = true;
  if (musicFailed) return;
  if (musicReady) playMusic();
  else showMusicState('Carregando música', 'Preparando a trilha da noite…');
}
function pauseMusic() {
  musicWanted = false;
  if (musicReady) musicPlayer.pauseVideo();
}
musicButton.addEventListener('click', () => {
  if (musicFailed) {
    const target = location.protocol === 'file:'
      ? 'https://gabriela-mazon.github.io/convite-giulia/'
      : 'https://www.youtube.com/watch?v=88wi--Lls84';
    window.open(target, '_blank', 'noopener,noreferrer');
  } else if (musicPlaying || musicWanted) {
    pauseMusic();
    showMusicState('Tocar música', 'Música pausada.');
  } else {
    musicWanted = true;
    playMusic();
  }
});
window.onYouTubeIframeAPIReady = () => {
  musicPlayer = new YT.Player('youtube-player', {
    width: '356', height: '200', videoId: '88wi--Lls84',
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      playsinline: 1, controls: 1, loop: 1, playlist: '88wi--Lls84',
      ...(location.protocol.startsWith('http') ? {origin: location.origin} : {})
    },
    events: {
      onReady: event => {
        musicReady = true;
        event.target.setVolume(35);
        if (musicWanted) playMusic();
        else showMusicState('Tocar música', 'A música começa ao abrir o convite.');
      },
      onStateChange: event => {
        musicPlaying = event.data === YT.PlayerState.PLAYING;
        if (musicPlaying) {
          showMusicState('Pausar música', 'Tocando: Disney Full Intro Instrumental');
          finishMusicStart();
        }
        else if (event.data === YT.PlayerState.PAUSED) {
          musicWanted = false;
          showMusicState('Tocar música', 'Música pausada.');
        }
      },
      onAutoplayBlocked: () => {
        musicWanted = false;
        showMusicState('Tocar música', 'Toque em “Tocar música” ou no vídeo para ouvir.');
        finishMusicStart();
      },
      onError: event => {
        musicFailed = true;
        musicWanted = false;
        if (location.protocol === 'file:') {
          showMusicState('Abrir convite online', 'Para ouvir a música, abra o convite pelo endereço publicado ou por um servidor local.');
        } else {
          showMusicState('Ouvir no YouTube', `A música não pôde ser reproduzida aqui (erro ${event.data}). Você pode ouvir pelo link do YouTube.`);
        }
        musicButton.title = musicStatus.textContent;
        finishMusicStart();
      }
    }
  });
};
const youtubeScript = document.createElement('script');
youtubeScript.src = 'https://www.youtube.com/iframe_api';
youtubeScript.onerror = () => {
  musicFailed = true;
  showMusicState('Ouvir no YouTube', 'Não foi possível carregar a música. Abra o link do YouTube para ouvir.');
  finishMusicStart();
};
document.head.append(youtubeScript);
