var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JuegoSchema = new Schema({
	_id: {
		type: Number
	},
	titulo: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	idPlataforma: {
		type: Number,
	},
	plataforma: {
		type: String,
		trim: true,
		required: "Falta plataforma"
	},
	fechaDeLanzamiento: {
		type: Date
	},
	descripcion: {
		type: String
	}
});

mongoose.model('Juego', JuegoSchema);

/*{
        "_id" : 20960,
        "titulo" : "Bloodborne",
        "idPlataforma" : 4919,
        "plataforma" : "Sony Playstation 4",
        "fechaDeLanzamiento" : "03/24/2015",
        "descripcion" : "Face your fears as you search for answers in the ancien
t city of Yharnam, now cursed with a strange endemic illness spreading through t
he streets like wildfire. Danger, death and madness lurk around every corner of
this dark and horrific world, and you must discover its darkest secrets in order
 to survive. A Terrifying New World: Journey to a horror-filled gothic city wher
e deranged mobs and nightmarish creatures lurk around every corner. Strategic Ac
tion Combat: Armed with a unique arsenal of weaponry, including guns and saw cle
avers, you'll need wits, strategy and reflexes to take down the agile and intell
igent enemies that guard the city's dark secrets. A New Generation of Action RPG
: Stunningly detailed gothic environments, atmospheric lighting, and advanced ne
w online experiences showcase the power and prowess of the PlayStation(R)4 syste
m.",
        "clasificacion" : "RP - Rating Pending",
        "genero" : [
                "Action",
                "Role-Playing"
        ],
        "jugadores" : "1",
        "coop" : "No",
        "youtube" : "http://www.youtube.com/watch?v=G203e1HhixY",
        "editor" : "Sony",
        "desarrollador" : "FromSoftware, Inc.",
        "puntuacion" : null,
        "imagenes" : {
                "fanart" : {
                        "original" : {
                                "content" : "fanart/original/20960-1.jpg",
                                "width" : "1920",
                                "height" : "1080"
                        },
                        "thumb" : "fanart/thumb/20960-1.jpg"
                },
                "boxart" : {
                        "content" : "boxart/original/front/20960-1.jpg",
                        "side" : "front",
                        "width" : "410",
                        "height" : "453",
                        "thumb" : "boxart/thumb/original/front/20960-1.jpg"
                },
                "screenshot" : [
                        {
                                "original" : {
                                        "content" : "screenshots/20960-1.jpg",
                                        "width" : "1920",
                                        "height" : "1080"
                                },
                                "thumb" : "screenshots/thumb/20960-1.jpg"
                        },
                        {
                                "original" : {
                                        "content" : "screenshots/20960-2.jpg",
                                        "width" : "1920",
                                        "height" : "1080"
                                },
                                "thumb" : "screenshots/thumb/20960-2.jpg"
                        },
                        {
                                "original" : {
                                        "content" : "screenshots/20960-3.jpg",
                                        "width" : "1920",
                                        "height" : "1080"
                                },
                                "thumb" : "screenshots/thumb/20960-3.jpg"
                        }
                ]
        },
        "urlBase" : "http://thegamesdb.net/banners/"*/