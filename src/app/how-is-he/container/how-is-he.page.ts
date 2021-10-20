import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { gotToTop } from '@bible/shared/shared/utils/utils';


@Component({
  selector: 'app-how-is-he',
  template: `
    <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
      <div class="container">

        <!-- CABECERA  -->
        <div class="header fade-in-card">
          <h1>{{ 'COMMON.HOW_IS_HE' | translate }}</h1>
        </div>

        <ion-card class="fade-in-card" >
          <ion-card-content class="text-second-color">
            En el mundo hay muchas personas famosas. Algunas son muy conocidas en su propia comunidad, ciudad o nación, y otras en el mundo entero. Pero el hecho de que usted sepa el nombre de alguien famoso no significa que conozca a esa persona, es decir, que esté enterado de los detalles de su pasado o de cómo es en realidad.

            2 Aunque ya han pasado unos dos mil años desde que Jesucristo vivió en la Tierra, en todo el mundo se habla de él. Sin embargo, existe mucha confusión sobre quién fue en realidad. Algunos dicen que fue tan solo un hombre bueno. Otros piensan que no fue más que un profeta. Y hay quienes creen que Jesús es Dios y debemos adorarlo. ¿Será esto cierto?

            3. ¿Por qué es importante que usted sepa la verdad sobre Jesús?

            3 Es importante que usted sepa la verdad sobre Jesús. ¿Por qué? Porque la Biblia dice: “Esto significa vida eterna, el que estén adquiriendo conocimiento de ti, el único Dios verdadero, y de aquel a quien tú enviaste, Jesucristo” (Juan 17:3). En efecto, conocer la verdad sobre Jehová Dios y sobre Jesucristo puede llevarle a vivir para siempre en un paraíso terrestre (Juan 14:6). Además, Jesús dio el mejor ejemplo de cómo se debe vivir y tratar al prójimo (Juan 13: 34, 35). En el primer capítulo de este libro vimos cuál es la verdad acerca de Dios. Veamos ahora lo que enseña la Biblia acerca de Jesucristo.

            EL MESÍAS PROMETIDO

            4. ¿Qué significan los títulos Mesías y Cristo?

            4 Mucho antes de que Jesús naciera, la Biblia predijo la llegada del enviado de Dios, el llamado Mesías o Cristo. Los títulos Mesías (derivado de una palabra hebrea) y Cristo (derivado de una palabra griega) significan “Ungido”. De modo que el enviado prometido sería ungido, es decir, nombrado por Dios para ocupar una posición especial. En otros capítulos de este libro veremos con más detalle que el Mesías tiene un  importantísimo papel en el cumplimiento de las promesas divinas. También veremos que Jesús puede bendecirnos incluso hoy en día. Seguramente, ya antes de que Jesús naciera, muchas personas se preguntaban: “¿Quién será el Mesías?”.

            5. ¿De qué estaban totalmente convencidos los discípulos de Jesús?

            5 En el siglo primero de nuestra era, los discípulos de Jesús de Nazaret estaban totalmente convencidos de que él era el Mesías predicho (Juan 1:41). Uno de ellos, Simón Pedro, le dijo sin rodeos: “Tú eres el Cristo” (Mateo 16:16). Ahora bien, ¿por qué estaban tan seguros aquellos discípulos de que Jesús era en verdad el Mesías prometido? ¿Y por qué podemos estar seguros nosotros?

            6. ¿Qué comparación nos permite entender cómo ha ayudado Jehová a las personas fieles a identificar al Mesías?

            6 Los profetas de Dios que vivieron antes que Jesús predijeron muchos detalles que ayudarían a identificar al Mesías. Por poner una comparación: suponga que usted tuviera que ir a buscar a un desconocido a una concurrida estación de autobuses o de trenes, o a un aeropuerto. ¿Verdad que le vendría bien conocer algunas características de la persona? Pues bien, mediante los profetas bíblicos, Jehová dio una descripción bastante detallada de lo que haría el Mesías y de las cosas que le sucederían. De este modo, las personas fieles podrían reconocerlo sin ninguna duda cuando vieran cumplirse todas esas profecías.

            7. Mencione dos de las profecías que se cumplieron en Jesús.

            7 Veamos un par de ejemplos. El primero es el siguiente: más de setecientos años antes de que ocurriera, el profeta Miqueas predijo que el enviado prometido nacería en Belén, un pequeño pueblo de la tierra de Judá (Miqueas 5:2). Pues bien, ¿dónde nació Jesús? Justo en ese lugar (Mateo 2:1, 3-9). El segundo ejemplo es la profecía de Daniel 9:25, que con muchos siglos de antelación permitía calcular el  año exacto en que se presentaría el Mesías: el año 29 de nuestra era. * El cumplimiento de estas y otras profecías demuestra que Jesús era el Mesías prometido.

            Cuando Jesús se bautizó, el espíritu de Dios descendió sobre él como paloma para probar que era el Mesías

            Cuando Jesús se bautizó, se convirtió en el Mesías, o Cristo

            8, 9. ¿De qué manera se demostró más claramente en el bautismo de Jesús que él era el Mesías?

            8 A finales del año 29 se demostró aún más claramente que Jesús era el Mesías. Fue entonces cuando él le pidió a Juan el Bautista que lo bautizara en el río Jordán. Jehová había prometido a Juan que le daría una señal para que pudiera reconocer al Mesías, y se la dio en el bautismo de Jesús. La Biblia relata: “Después que Jesús fue bautizado, inmediatamente salió del agua; y, ¡mire!, los cielos se abrieron, y él vio descender como paloma el espíritu de Dios que venía sobre él. ¡Mire! También hubo una voz desde los cielos que decía: ‘Este es mi Hijo, el amado, a quien he aprobado’” (Mateo 3:16, 17). Cuando Juan vio y escuchó aquello, no tuvo ninguna duda de que Jesús era el enviado de Dios (Juan 1:32-34). Aquel día, cuando el espíritu santo —es decir, la fuerza activa de Dios— se derramó sobre él, Jesús llegó a ser el Mesías, o Cristo, la persona elegida para ser Caudillo y Rey (Isaías 55:4).

            9 Las profecías bíblicas que se han cumplido y el testimonio que Jehová mismo dio prueban claramente que Jesús era el Mesías prometido. Pero la Biblia contesta otras dos preguntas importantes sobre Jesucristo: de dónde vino y qué clase de persona fue.

            ¿DE DÓNDE VINO JESÚS?

            10. ¿Qué enseña la Biblia sobre la existencia de Jesús antes de que viniera a la Tierra?

            10 La Biblia enseña que Jesús vivió en el cielo antes de venir a la Tierra. Por ejemplo, además de predecir que el  Mesías nacería en Belén, el profeta Miqueas indicó que su origen tuvo lugar en “tiempos tempranos” (Miqueas 5:2). De hecho, el propio Jesús dijo en muchas ocasiones que antes de nacer como hombre había vivido en el cielo (Juan 3:13; 6:38, 62; 17:4, 5). Allí era una criatura espiritual que disfrutaba de una relación especial con Jehová.

            11. ¿Cómo muestra la Biblia que Jesús es el Hijo más querido de Jehová?

            11 Por muchas razones, Jesús es el hijo más querido de Jehová. La Biblia lo llama “el primogénito de toda la creación”, pues él fue lo primero que Dios creó (Colosenses 1:15). * Otra cosa que lo hace especial es el hecho de ser el “Hijo unigénito” (Juan 3:16). Esto significa que es el único a quien Dios creó directamente. También es el único que colaboró con Jehová en la creación de todas las demás cosas (Colosenses 1:16). Además, se le llama “la Palabra” (Juan 1:14). Este título muestra que era el encargado de hablar en nombre de su Padre. Seguramente daba mensajes e instrucciones a los demás hijos de Dios, tanto a ángeles como a seres humanos.

            12. ¿Qué pruebas tenemos de que el Hijo primogénito no es igual a Dios?

            12 ¿Es el Hijo primogénito igual a Dios, como algunos creen? Eso no es lo que la Biblia enseña. Como vimos en el párrafo anterior, el Hijo fue creado. Por lo tanto, es obvio que tuvo un principio, mientras que Jehová no tiene ni principio ni fin (Salmo 90:2). Al Hijo unigénito ni siquiera se le ocurrió tratar de igualarse a su Padre. La Biblia enseña claramente que el Padre es mayor que el Hijo (Juan 14:28; 1 Corintios 11:3). Solo Jehová es el “Dios  Todopoderoso” (Génesis 17:1). Por consiguiente, no tiene igual. *

            13. ¿Qué quiere decir la Biblia cuando afirma que el Hijo es “la imagen del Dios invisible”?

            13 Jehová y su Hijo primogénito disfrutaron de una relación muy estrecha durante millones y millones de años, mucho antes de la creación de las estrellas y la Tierra. ¡Qué gran amor deben de haberse tenido! (Juan 3:35; 14:31.) Este Hijo querido era tal como su Padre. Por esa razón, la Biblia dice que él es “la imagen del Dios invisible” (Colosenses 1:15). En efecto, igual que los hijos suelen parecerse a sus padres de muchas maneras, este Hijo celestial de Dios también reflejaba las cualidades y la personalidad de su Padre.

            14. ¿De qué manera llegó a nacer como hombre el Hijo unigénito de Jehová?

            14 El Hijo unigénito de Jehová dejó voluntariamente el cielo para venir a la Tierra y ser hombre. Pero quizá usted se pregunte: “¿Cómo fue posible que un espíritu naciera como ser humano?”. Pues bien, Jehová realizó un milagro. Hizo que la vida de su Hijo primogénito, que estaba en el cielo, pasara a la matriz de una virgen judía llamada María. Puesto que no intervino ningún padre humano, ella dio a luz un hijo perfecto, al que puso por nombre Jesús (Lucas 1:30-35).

            ¿QUÉ CLASE DE PERSONA FUE JESÚS?

            Jesús predicando a un pequeño grupo en una casa

            15. ¿De qué manera llegamos a conocer mejor a Jehová por medio de Jesús?

            15 Todo lo que Jesús hizo y dijo mientras estuvo en la Tierra nos ayuda a conocerlo bien. Y, lo que es más, por medio de él podemos conocer mejor a Jehová. ¿De qué  manera? Recuerde que este Hijo es la viva imagen de su Padre. Por eso le dijo a uno de sus discípulos: “El que me ha visto a mí ha visto al Padre también” (Juan 14:9). En los cuatro libros de la Biblia que se conocen como los Evangelios —Mateo, Marcos, Lucas y Juan—, hallamos mucha información sobre la vida, las obras y las cualidades de Jesucristo.

            16. ¿Cuál fue el principal mensaje de Jesús, y de quién procedían sus enseñanzas?

            16 A Jesús se le llamaba “Maestro” (Juan 1:38; 13:13). ¿Qué era lo que enseñaba? Principalmente, proclamaba el mensaje de “las buenas nuevas del reino”, es decir, las buenas noticias sobre el Reino de Dios. Este gobierno regirá toda la Tierra desde el cielo y derramará un sinfín de bendiciones sobre los seres humanos que sean fieles a Dios (Mateo 4:23). ¿De quién procedía este mensaje? Jesús mismo lo dijo: “Lo que yo enseño no es mío, sino que pertenece al que me ha enviado”, o sea, a Jehová (Juan 7:16). El Hijo sabía que su Padre deseaba que la gente oyera las buenas nuevas del Reino de Dios. En el capítulo 8 veremos más detalles acerca de este gobierno y de lo que logrará.

            Jesús predicando a pescadores

            17. ¿Dónde enseñaba Jesús, y por qué se esforzó tanto por hacerlo?

            17 ¿Dónde enseñaba Jesús? En cualquier lugar donde hubiera gente: tanto en el campo como en las ciudades, los pueblos, los mercados y las casas. Jesús no se sentaba a esperar a que las personas acudieran a él, sino que iba a buscarlas (Marcos 6:56; Lucas 19:5, 6). ¿Por qué dedicó tanto tiempo y esfuerzo a predicar y enseñar? Porque esa era la voluntad de su Padre, y Jesús siempre la cumplió (Juan 8:28, 29). Pero había otra razón, y era que sentía compasión por las multitudes que iban a verlo (Mateo 9:35, 36). Los líderes religiosos deberían haberles enseñado la verdad sobre Dios y sus propósitos, pero las habían  dejado abandonadas. Sin embargo, Jesús sabía cuánto necesitaban escuchar el mensaje del Reino.

            18. ¿Qué cualidades de Jesús le atraen más?

            18 Jesús fue un hombre tierno, cariñoso y de gran corazón. Trataba a la gente con sencillez y amabilidad, y hasta los niños se sentían cómodos a su lado (Marcos 10:13-16). No mostraba favoritismo. Odiaba la corrupción y la injusticia (Mateo 21:12, 13). En una época en la que se mostraba poco respeto y consideración a las mujeres, él las trató con dignidad (Juan 4:9, 27). Jesús era humilde de verdad. En cierta ocasión les lavó los pies a los apóstoles, una tarea que solían realizar los criados de menor categoría.

            Jesús extendiendo la mano para sanar a unos enfermos

            Jesús predicaba en cualquier lugar donde hubiera gente

            19. ¿Qué ejemplo muestra que Jesús sentía compasión por las personas que sufrían?

            19 Jesús sentía compasión por las personas que sufrían, como lo demostró especialmente cuando realizó curaciones milagrosas con el poder del espíritu de Dios (Mateo  14:14). Por ejemplo, un leproso lo buscó y le dijo: “Si tan solo quieres, puedes limpiarme”. Jesús sintió en su propio corazón el sufrimiento de aquel hombre. Compadecido, extendió la mano, lo tocó y le dijo: “Quiero. Sé limpio”. ¡Y el enfermo sanó! (Marcos 1:40-42.) ¿Se imagina usted cómo debió sentirse aquella persona?

            FIEL HASTA EL FINAL

            20, 21. ¿Por qué podemos decir que Jesús es el mejor ejemplo de obediencia y lealtad a Dios?

            20 Jesús es el mejor ejemplo de obediencia y lealtad a Dios. En toda circunstancia permaneció fiel a su Padre celestial, a pesar de soportar todo tipo de oposición y sufrimientos. Rechazó con firmeza las tentaciones de Satanás (Mateo 4:1-11). Hubo un tiempo en que algunos de sus propios parientes no creyeron en él. Incluso llegaron a decir: “Ha perdido el juicio” (Marcos 3:21). Pero Jesús no se  desanimó y siguió efectuando la obra de Dios. Cuando sus adversarios lo insultaron y agredieron, siempre supo contenerse y no intentó hacerles daño (1 Pedro 2:21-23).

            21 Jesús fue fiel hasta la muerte, una muerte cruel y dolorosa a manos de sus enemigos (Filipenses 2:8). Piense en lo que soportó el último día de su vida como hombre. Tuvo que aguantar que las autoridades lo arrestaran, que testigos falsos lo acusaran, que jueces corruptos lo condenaran, que la gente se burlara de él y que los soldados lo torturaran. Clavado en el madero, exclamó con su último aliento: “¡Se ha realizado!” (Juan 19:30). Tres días después, su Padre celestial lo resucitó como criatura espiritual (1 Pedro 3:18). Al cabo de pocas semanas regresó al cielo, donde “se sentó a la diestra de Dios” a la espera de recibir el poder para reinar (Hebreos 10:12, 13).

            22. ¿Qué logró Jesús al permanecer fiel hasta el final?

            22 ¿Qué logró Jesús al permanecer fiel hasta el final? Su muerte abrió el camino para que podamos vivir eternamente en un paraíso terrestre, tal como Jehová se propuso desde un principio. En el próximo capítulo veremos cómo logra la muerte de Jesús que esta esperanza se haga realidad.
          </ion-card-content>
        </ion-card>
      </div>

      <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="background-component text-color-white"  (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>

    </ion-content>
    `,
  styleUrls: ['./how-is-he.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowIsHePage {

  @ViewChild(IonContent, {static: true}) content: IonContent;
  gotToTop = gotToTop;
  showButton: boolean = false;


  constructor() { }


  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }
}
