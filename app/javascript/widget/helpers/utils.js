import { WOOT_PREFIX } from './constants';

export const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const arrayToHashById = array =>
  array.reduce((map, obj) => {
    const newMap = map;
    newMap[obj.id] = obj;
    return newMap;
  }, {});

export const IFrameHelper = {
  isIFrame: () => window.self !== window.top,
  sendMessage: msg => {
    window.parent.postMessage(
      `chatwoot-widget:${JSON.stringify({ ...msg })}`,
      '*'
    );
  },
  isAValidEvent: e => {
    const isDataAString = typeof e.data === 'string';
    const isAValidWootEvent =
      isDataAString && e.data.indexOf(WOOT_PREFIX) === 0;
    return isAValidWootEvent;
  },
  getMessage: e => JSON.parse(e.data.replace(WOOT_PREFIX, '')),
};

window.addEventListener('chatwoot:ready', function () {	  
  window.$chatwoot.onclick = function(event) { 
		alert("click");
		if (event.target.localName == 'a') {
			alert('a_target');
			if (event.target.href.split('.')[0] == 'https://postback') {
				alert('postback target');
				payload = event.target.href.split('.')[1].replace('/','').replace('\\','')
				sender_id = event.target.href.split('.')[2].replace('/','').replace('\\','')
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.open( "GET", "https://escapade-6t98.herokuapp.com/postback?payload=" + payload + "&sender_id=" + sender_id, true ); // false for synchronous request
				xmlHttp.send( null );
				event.preventDefault();
			}
		}
	};
});