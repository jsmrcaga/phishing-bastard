const names = ['Martin','Bernard','Thomas','Petit','Robert','Richard','Jean-jacques','Alaric','Durand','Dubois','Moreau','Laurent','Simon','Michel','Lefebvre','Leroy','Roux','David','Bertrand','Morel','Fournier','Girard','Bonnet','Dupont','Lambert','Fontaine','Rousseau','Vincent','Muller','Lefevre','Faure','Andre','Mercier','Blanc','Guerin','Boyer','Garnier','Chevalier','Francois','Legrand','Gauthier','Garcia 52','Perrin','Robin','Clement','Morin','Nicolas','Henry','Roussel','Mathieu','Gautier','Masson','Marchand','Duval','Denis','Dumont','Marie','Lemaire','Noel','Meyer','Dufour','Meunier','Brun','Blanchard','Giraud','Joly','Riviere','Lucas','Brunet','Gaillard','Barbier','Arnaud'];
const passwords = ['1234', 'azerty', 'qwerty', 'chien', 'poulet', 'mon poto', 'what!!', 'OUI!!35', '1984', 'mnamour', 'wtf', 'monmdp', 'motdepasse', 'password', '1123456789', '!!!!uu', 'hahaHAHA', 'nope', 'yeaaah', 'LOL'];

const fishingrod = require('fishingrod');
const qs = require('querystring');

// for heroku
const http = require('http');

function launch(){
	setInterval(function(){
		var name = names[Math.floor(names.length * Math.random())];
		var lastname = names[Math.floor(names.length * Math.random())];
		var password = passwords[Math.floor(Math.random() * passwords.length)];
		fishingrod.fish({
			http: false,
			host: 'helpowaservfr.esy.es',
			method: 'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded',
				'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
			},
			data: `wb_form_id=5d774976&message=&wb_input_0=Adresse+e-mail&wb_input_0=${name}.${lastname}@nope.com&wb_input_1=Domaine+%5C+Nom+d%27utilisateur&wb_input_1=${name}.${lastname}&wb_input_2=Mot+de+passe&wb_input_2=${password}&wb_input_3=%C3%89tudiant+%2F+Personnel&wb_input_3=etudiant`
		}).then((res)=>{
			console.log('Sent!', name, lastname, password, res.status);
		}).catch((e)=>{
			console.error('Error sending', e);
		});
	}, 1000);
}

launch();

var serv = http.createServer((req, res)=> {
	res.write('plep');
	res.end();
});

serv.listen(process.env.PORT);
