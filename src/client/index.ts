import 'pixi.js'




import Game from './main'


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
		game.update(deltatime / 1000)
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

