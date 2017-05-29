import 'pixi.js'
import Game from './main'


// if(process.env.DEBUG){

// 	const Stats = require('stats.js')
// 	var stats = new Stats();
// 	var stats2 = new Stats();

// 	document.body.appendChild( stats.domElement );
// 	stats.domElement.style.position = "absolute";
// 	stats.domElement.style.top = "0px";
// 	document.body.appendChild( stats2.domElement );
// 	stats2.domElement.style.position = "absolute";
// 	stats2.domElement.style.top = "0px";
// 	stats2.domElement.style.left = "80px";

// }

function onReady (){
	const game = new Game()
	let time = 0;
    console.log(game)

	document.body.appendChild(game.view)

	window.addEventListener("resize", game.resize.bind(game));

	function update(t:number){
		if (!time) 
			time = t;
		let deltatime = t - time;
		time = t;
		// process.env.DEBUG && stats2.begin();
		// TWEEN.update()
		game.update(deltatime)
		// process.env.DEBUG && stats2.end();

		// process.env.DEBUG && stats.begin();
		game.render()
		// process.env.DEBUG && stats.end();
		
		requestAnimationFrame(update)
	}

	requestAnimationFrame(update)

}
onReady()

// loadPromise.then(() => {
// 	onReady()
// 	window.onloaddone && window.onloaddone()
// })

