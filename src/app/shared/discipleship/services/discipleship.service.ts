import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DiscipleshipService {

  ALLVERSES = {
    'hope':[
      "Jeremías 29:11 | orque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
      "Salmo 42:11 | ¿Por qué te abates, oh alma mía, Y por qué te turbas dentro de mí? Espera en Dios; porque aún he de alabarle, Salvación mía y Dios mío.",
      "Isaías 40:3 | Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
      "Salmo 121:7-8 | Jehová te guardará de todo mal; El guardará tu alma. Jehová guardará tu salida y tu entrada Desde ahora y para siempre.",
      "Romanos 15:13 | Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.",
      "Mateo 11:28 | Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
      "Hebreos 11:1 | Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
      "1 Corintios 13:13 | Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.",
      "Romanos 5:3-4 | Y no sólo esto, sino que también nos gloriamos en las tribulaciones, sabiendo que la tribulación produce paciencia; y la paciencia, prueba; y la prueba, esperanza.",
      "Salmo 119:114 | Mi escondedero y mi escudo eres tú; En tu palabra he esperado.",
      "Hebreos 10:23 | Mantengamos firme, sin fluctuar, la profesión de nuestra esperanza, porque fiel es el que prometió.",
      "Salmo 31:24 | Esforzaos todos vosotros los que esperáis en Jehová, Y tome aliento vuestro corazón.",
      "Romanos 8:25 | Pero si esperamos lo que no vemos, con paciencia lo aguardamos.",
      "Miqueas 7:7 | Mas yo a Jehová miraré, esperaré al Dios de mi salvación; el Dios mío me oirá.",
      "Proverbios 13:12 | La esperanza que se demora es tormento del corazón; Pero árbol de vida es el deseo cumplido.",
    ],
    'love': [
      '1 Corintios 13:4-5 | El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor.',
      "1 Corintios 16:14 | Todas vuestras cosas sean hechas con amor.",
      "Salmo 143:8 | Hazme oír por la mañana tu misericordia, Porque en ti he confiado; Hazme saber el camino por donde ande, Porque a ti he elevado mi alma.",
      "Colosenses 3:14 | Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.",
      "Proverbios 3:3-4 | Nunca se aparten de ti la misericordia y la verdad; Atalas a tu cuello, Escríbelas en la tabla de tu corazón; Y hallarás gracia y buena opinión Ante los ojos de Dios y de los hombres.",
      "1 Juan 4:16 | Y nosotros hemos conocido y creído el amor que Dios tiene para con nosotros. Dios es amor; y el que permanece en amor, permanece en Dios, y Dios en él.",
      "Efesios 4:2 | Con toda humildad y mansedumbre, soportándoos con paciencia los unos a los otros en amor.",
      "1 Juan 4:19 | Nosotros le amamos a él, porque él nos amó primero.",
      "1 Corintios 13:13 | Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.",
      "1 Pedro 4:8 | Y ante todo, tened entre vosotros ferviente amor; porque el amor cubrirá multitud de pecados.",
      "Romanos 12:9 | El amor sea sin fingimiento. Aborreced lo malo, seguid lo bueno.",
      "Efesios 3:16-17 | Para que os dé, conforme a las riquezas de su gloria, el ser fortalecidos con poder en el hombre interior por su Espíritu; para que habite Cristo por la fe en vuestros corazones, a fin de que, arraigados y cimentados en amor.",
      "1 Corintios 13:2 |Y si tuviese profecía, y entendiese todos los misterios y toda ciencia, y si tuviese toda la fe, de tal manera que trasladase los montes, y no tengo amor, nada soy.",
      "Juan 15:12 | Este es mi mandamiento: Que os améis unos a otros, como yo os he amado."
    ],
    'sorry': [
      "Proverbios 17:9 | El que cubre la falta busca amistad; Mas el que la divulga, aparta al amigo.",
      "Efesios 4:32 | Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.",
      "Mateo 6:14 | Porque si perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial.",
      "Colosenses 3:13 | Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja contra otro. De la manera que Cristo os perdonó, así también hacedlo vosotros.",
      "2 Crónicas 7:14 | Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra.",
      "Lucas 6:37 | No juzguéis, y no seréis juzgados; no condenéis, y no seréis condenados; perdonad, y seréis perdonados.",
      "Mateo 18:21-22 | Entonces se le acercó Pedro y le dijo: Señor, ¿cuántas veces perdonaré a mi hermano que peque contra mí? ¿Hasta siete? Jesús le dijo: No te digo hasta siete, sino aun hasta setenta veces siete.",
      "Proverbios 28:13 | El que encubre sus pecados no prosperará; Mas el que los confiesa y se aparta alcanzará misericordia.",
      "Salmo 86:5 | Porque tú, Señor, eres bueno y perdonador, Y grande en misericordia para con todos los que te invocan.",
      "Miqueas 7:18 | ¿Qué Dios como tú, que perdona la maldad, y olvida el pecado del remanente de su heredad? No retuvo para siempre su enojo, porque se deleita en misericordia.",
      "Marcos 11:25 | Y cuando estéis orando, perdonad, si tenéis algo contra alguno, para que también vuestro Padre que está en los cielos os perdone a vosotros vuestras ofensas.",
      "Hechos 13:38-39 | Sabed, pues, esto, varones hermanos: que por medio de él se os anuncia perdón de pecados, y que de todo aquello de que por la ley de Moisés no pudisteis ser justificados, en él es justificado todo aquel que cree.",
      "1 Juan 2:2 | Y él es la propiciación por nuestros pecados; y no solamente por los nuestros, sino también por los de todo el mundo.",
      "Salmo 32:5 | Mi pecado te declaré, y no encubrí mi iniquidad. Dije: Confesaré mis transgresiones a Jehová; Y tú perdonaste la maldad de mi pecado. Selah",
      "Joel 2:13 | Rasgad vuestro corazón, y no vuestros vestidos, y convertíos a Jehová vuestro Dios; porque misericordioso es y clemente, tardo para la ira y grande en misericordia, y que se duele del castigo.",
    ],
    'family': [
      "Deuteronomio 6:6-7 | Y estas palabras que yo te mando hoy, estarán sobre tu corazón; y las repetirás a tus hijos, y hablarás de ellas estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes.",
      "Hechos 16:31 | Ellos dijeron: Cree en el Señor Jesucristo, y serás salvo, tú y tu casa.",
      "1 Corintios 1:10 | Os ruego, pues, hermanos, por el nombre de nuestro Señor Jesucristo, que habléis todos una misma cosa, y que no haya entre vosotros divisiones, sino que estéis perfectamente unidos en una misma mente y en un mismo parecer.",
      "Proverbios 6:20 | Guarda, hijo mío, el mandamiento de tu padre, Y no dejes la enseñanza de tu madre.",
      "1 Juan 4:20 | Si alguno dice: Yo amo a Dios, y aborrece a su hermano, es mentiroso. Pues el que no ama a su hermano a quien ha visto, ¿cómo puede amar a Dios a quien no ha visto?",
      "Salmo 133:1 | ¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!",
      "Isaías 49:15-16 | ¿Se olvidará la mujer de lo que dio a luz, para dejar de compadecerse del hijo de su vientre? Aunque olvide ella, yo nunca me olvidaré de ti. He aquí que en las palmas de las manos te tengo esculpida; delante de mí están siempre tus muros.",
      "Salmo 103:17-18 | Mas la misericordia de Jehová es desde la eternidad y hasta la eternidad sobre los que le temen, Y su justicia sobre los hijos de los hijos; Sobre los que guardan su pacto, Y los que se acuerdan de sus mandamientos para ponerlos por obra.",
      "Efesios 6:4 | Y vosotros, padres, no provoquéis a ira a vuestros hijos, sino criadlos en disciplina y amonestación del Señor.",
      "Proverbios 22:6 | Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.",
      "Éxodo 20:12 | Honra a tu padre y a tu madre, para que tus días se alarguen en la tierra que Jehová tu Dios te da.",
      "1 Timoteo 5:8 | orque si alguno no provee para los suyos, y mayormente para los de su casa, ha negado la fe, y es peor que un incrédulo.",
      "Proverbios 17:17 | En todo tiempo ama el amigo, Y es como un hermano en tiempo de angustia.",
      "Proverbios 17:6 | Corona de los viejos son los nietos, Y la honra de los hijos, sus padres.",
      "1 Reyes 8:57 | Esté con nosotros Jehová nuestro Dios, como estuvo con nuestros padres, y no nos desampare ni nos deje.",
    ],
    'marriage':[
      'Proverbios 18:22 | El que halla esposa halla el bien, Y alcanza la benevolencia de Jehová.',
      'Mateo 19:4-6 | Él, respondiendo, les dijo: ¿No habéis leído que el que los hizo al principio, varón y hembra los hizo, y dijo: Por esto el hombre dejará padre y madre, y se unirá a su mujer, y los dos serán una sola carne? Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre.',
      'Colosenses 3:18-19 | Casadas, estad sujetas a vuestros maridos, como conviene en el Señor. Maridos, amad a vuestras mujeres, y no seáis ásperos con ellas.',
      'Hebreos 13:4 | Honroso sea en todos el matrimonio, y el lecho sin mancilla; pero a los fornicarios y a los adúlteros los juzgará Dios.',
      'Proverbios 31:10 | Mujer virtuosa, ¿quién la hallará? Porque su estima sobrepasa largamente a la de las piedras preciosas.',
      'Efesios 5:25-26 | Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella, para santificarla, habiéndola purificado en el lavamiento del agua por la palabra.',
      'Proverbios 16:9 | El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos.',
      '1 Corintios 7:2 | Pero a causa de las fornicaciones, cada uno tenga su propia mujer, y cada una tenga su propio marido.',
      'Génesis 2:18 | Y dijo Jehová Dios: No es bueno que el hombre esté solo; le haré ayuda idónea para él.',
      'Deuteronomio 24:5 | Cuando alguno fuere recién casado, no saldrá a la guerra, ni en ninguna cosa se le ocupará; libre estará en su casa por un año, para alegrar a la mujer que tomó.',
      'Génesis 2:22-24 | Y de la costilla que Jehová Dios tomó del hombre, hizo una mujer, y la trajo al hombre. Dijo entonces Adán: Esto es ahora hueso de mis huesos y carne de mi carne; ésta será llamada Varona, porque del varón fue tomada. Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.',
      'Efesios 5:22-23 | Las casadas estén sujetas a sus propios maridos, como al Señor; porque el marido es cabeza de la mujer, así como Cristo es cabeza de la iglesia, la cual es su cuerpo, y él es su Salvador.',
    ],
    'salvation':[
      'Hechos 4:12 | Y en ningún otro hay salvación; porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos.',
      'Hechos 16:31 | Ellos dijeron: Cree en el Señor Jesucristo, y serás salvo, tú y tu casa.',
      '2 Timoteo 1:9 | Quien nos salvó y llamó con llamamiento santo, no conforme a nuestras obras, sino según el propósito suyo y la gracia que nos fue dada en Cristo Jesús antes de los tiempos de los siglos.',
      'Salmo 62:1 | En Dios solamente está acallada mi alma; De él viene mi salvación.',
      'Hechos 2:21 | Y todo aquel que invocare el nombre del Señor, será salvo.',
      '1 Corintios 6:9-10 | ¿No sabéis que los injustos no heredarán el reino de Dios? No erréis; ni los fornicarios, ni los idólatras, ni los adúlteros, ni los afeminados, ni los que se echan con varones, ni los ladrones, ni los avaros, ni los borrachos, ni los maldicientes, ni los estafadores, heredarán el reino de Dios.',
      'Romanos 10:10 | Porque con el corazón se cree para justicia, pero con la boca se confiesa para salvación.',
      'Tito 2:11-12 | Porque la gracia de Dios se ha manifestado para salvación a todos los hombres, enseñándonos que, renunciando a la impiedad y a los deseos mundanos, vivamos en este siglo sobria, justa y piadosamente.',
      'Lucas 19:10 | Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.',
      '2 Pedro 3:9 | El Señor no retarda su promesa, según algunos la tienen por tardanza, sino que es paciente para con nosotros, no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento.',
      'Lucas 18:27 | Él les dijo: Lo que es imposible para los hombres, es posible para Dios.',
      'Marcos 16:16 | El que creyere y fuere bautizado, será salvo; mas el que no creyere, será condenado.',
      'Mateo 7:13-14 | Entrad por la puerta estrecha; porque ancha es la puerta, y espacioso el camino que lleva a la perdición, y muchos son los que entran por ella; porque estrecha es la puerta, y angosto el camino que lleva a la vida, y pocos son los que la hallan.',
      '1 Pedro 1:8-9 | A quien amáis sin haberle visto, en quien creyendo, aunque ahora no lo veáis, os alegráis con gozo inefable y glorioso; obteniendo el fin de vuestra fe, que es la salvación de vuestras almas.',
      'Hebreos 9:28 | Así también Cristo fue ofrecido una sola vez para llevar los pecados de muchos; y aparecerá por segunda vez, sin relación con el pecado, para salvar a los que le esperan.',
    ]
  };


  constructor() { }


  getDiscipleship(name:string): Observable<any>{
    return of(this.ALLVERSES[name])
  }


}
