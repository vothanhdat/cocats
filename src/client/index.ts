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

    console.log(game)

	document.body.appendChild(game.view)

	window.addEventListener("resize", game.resize.bind(game));

	function update(t:number){
		// process.env.DEBUG && stats2.begin();
		// TWEEN.update()
		game.update(t)
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

