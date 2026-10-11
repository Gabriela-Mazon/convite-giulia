// Preencha estes links quando os detalhes da festa estiverem definidos.
const CONFIG = {
  locationUrl: '', // Link completo do Google Maps para o local correto.
  rsvpUrl: '' // Exemplo: https://wa.me/5511999999999?text=Quero%20confirmar%20minha%20presenca
};
const opening = document.querySelector('#opening');
const invitation = document.querySelector('#invitation');
const dialog = document.querySelector('#details-dialog');
let openingInProgress = false;
async function openInvitation() {
  if (openingInProgress) return;
  openingInProgress = true;
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
    ],{duration:850,easing:'cubic-bezier(.22,.68,.25,1)',fill:'forwards'}).finished;
  }
  Object.assign(envelope.style,{left:`${destination.left}px`,top:`${destination.top}px`,width:`${destination.width}px`,height:`${destination.height}px`});
  envelope.getAnimations().forEach(animation=>animation.cancel());
  opening.classList.add('unfolding');
  if (!reducedMotion) {
    // Aguarda as duas abas abrirem antes de remover a camada de abertura.
    await new Promise(resolve=>setTimeout(resolve,1850));
    await opening.animate([{opacity:1},{opacity:0}],{duration:450,fill:'forwards'}).finished;
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
  document.querySelector('#dialog-copy').textContent=location?'A festa será na LaBelle Maison. O endereço completo e o horário serão adicionados assim que estiverem definidos.':'O canal de confirmação será adicionado em breve. Esta é uma prévia do convite.';
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
