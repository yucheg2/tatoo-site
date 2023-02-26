const sizes = {
    large: { name: "Большая", size: "Большая площадь тела" },
    medium: { name: "Средняя", size: "20x20 см" },
    small: { name: "Маленькая", size: "10x10 см" }
};

export const styles = {
    anime: {
        name: "Аниме",
        description:
            "Нательные рисунки в подобном стиле относят к части восточной техники. Японские персонажи отличаются непропорционально большими, чётко прорисованными глазами и сильными эмоциями. Высказывание «глаза — зеркало души» как нельзя лучше характеризуют этих героев. Стекающие по щекам ручьи слёз, увеличивающиеся от удивления и так большие глаза, сердечки, появляющиеся вместо зрачков — лишь часть эмоций, которые демонстрируют нам японские персонажи аниме."
    },
    graviur: {
        name: "Гравюра",
        description:
            "Многие из вас, наверняка, любят книги о средневековье с рассказами о сражениях, королевских пирах и прочих атрибутах этого времени. Все эти истории создают ощущение, что тогда все было более чинно, благородно и искренне. Стиль гравюра будет хорошо смотреться на теле, вне зависимости от предпочитаемого вами стиля одежды, не создавая при этом ощущения излишнего пафоса. Тату гравюра — прекрасный выбор для тех, кто хочет создать одновременно элегантное и простое изображение."
    },
    japan: {
        name: "Ориентал",
        description:
            "Японские тату – одни из ярчайших представителей восточной этники. Считается, что первые нательные рисунки у японцев появились еще до нашей эры. Однако в современное искусство они оформились несколько столетий назад. Сегодня японские татуировки можно смело назвать образцами консерватизма, ведь они сохраняют свои традиции несмотря на появление новых мировых веяний и тенденций."
    },
    keltskiy: {
        name: "Кельтийский",
        description:
            "Кельтские тату: браслеты, руны и другие символы, рукава на руках и на плече, а также узоры, нанесенные на груди и других частях тела, входят в перечень наиболее популярных вариантов орнаментов для мужчин и женщин. Они несут в себе отпечаток древнего знания, память об опыте племен, населявших обширные территории."
    },
    minimalism: {
        name: "Минимализм",
        description:
            "Тату в стиле минимализм — это главенство содержания над формой, это минимум деталей и лаконичность во всём. Такие татуировки не обязательно маленького размера, обычно они отличаются своей краткостью, которая, как известно, сестра таланта. Минимализм – это современное направление в живописи, призывающее отбросить всё лишнее, тот же самый принцип преследуют и минималистичные тату. Подобные рисунки способны подойти всем и каждому, благодаря своей простоте."
    },
    neo_tradishnl: {
        name: "Нео-традишнл",
        description:
            "В поисках подходящей идеи для татуировки, мы как правило руководствуемся желанием: «чтобы было не как у всех». И как быть в том случае, когда практически все предметы, растения, животные уже запечатлены в тату других людей? В такой ситуации приходится импровизировать и создавать свои варианты композиций и сюжетов. Стиль нео-традишнл позволит вам воплотить в жизнь любую, даже самую сумасшедшую идею. Именно о нем мы подробно расскажем в этой статье."
    }
};

const places = {
    hand: "Рука",
    shoulder: "Плечо",
    leg: "Нога",
    face: "Лицо",
    neck: "Шея",
    back: "Спина",
    belly: "Живот"
};

const tatoos = [
    {
        src: "sketches/anime/6b58d1cfbd00d668bf758856263e8461.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand]
    },
    {
        src: "sketches/anime/660b7dc66ca4a4562f3cf17732b3a0c4.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand]
    },
    {
        src: "sketches/anime/063221019d095acced52dc8d04f710c2.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder]
    },
    {
        src: "sketches/anime/1521607918_20.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-23.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-27.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder, places.leg]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-33.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder, places.leg]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-51.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.shoulder, places.leg, places.back]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-52.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-66.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder, places.leg]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-71.jpg",
        size: sizes.small,
        style: styles.anime.name,
        place: [places.hand, places.shoulder, places.leg, places.neck]
    },
    {
        src: "sketches/anime/Tattoo-artist-Oozy-74.jpg",
        size: sizes.medium,
        style: styles.anime.name,
        place: [places.hand, places.shoulder, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-01-683x1024.jpg",
        size: sizes.large,
        style: styles.graviur.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/graviur/tatu-gravjura-04-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.shoulder, places.back, places.hand, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-06-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-09-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.shoulder, places.hand, places.leg, places.back]
    },
    {
        src: "sketches/graviur/tatu-gravjura-15-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-18-683x1024.jpg",
        size: sizes.large,
        style: styles.graviur.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-22-683x1024.jpg",
        size: sizes.large,
        style: styles.graviur.name,
        place: [places.back]
    },
    {
        src: "sketches/graviur/tatu-gravjura-23-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-25-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.hand, places.leg]
    },
    {
        src: "sketches/graviur/tatu-gravjura-26-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.belly]
    },
    {
        src: "sketches/graviur/tatu-gravjura-28-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.hand, places.leg, places.shoulder, places.back]
    },
    {
        src: "sketches/graviur/tatu-gravjura-31-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.hand, places.leg, places.shoulder]
    },
    {
        src: "sketches/graviur/tatu-gravjura-32-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.hand, places.leg, places.shoulder, places.back]
    },
    {
        src: "sketches/graviur/tatu-gravjura-34-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.hand, places.leg, places.shoulder]
    },
    {
        src: "sketches/graviur/tatu-gravjura-35-683x1024.jpg",
        size: sizes.large,
        style: styles.graviur.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/graviur/tatu-gravjura-42-683x1024.jpg",
        size: sizes.medium,
        style: styles.graviur.name,
        place: [places.hand, places.leg, places.shoulder]
    },
    {
        src: "sketches/japan/31-683x1024.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/japan/36-683x1024.jpg",
        size: sizes.medium,
        style: styles.japan.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/japan/37-683x1024.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/japan/tatu-v-stile-oriental-7.jpg",
        size: sizes.medium,
        style: styles.japan.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/japan/tatu-v-stile-oriental-19.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder, places.leg]
    },
    {
        src: "sketches/japan/tatu-v-stile-oriental-35.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder, places.leg]
    },
    {
        src: "sketches/japan/tatu-v-yaponskom-stile-3.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/japan/vse-o-yaponskih-tatu.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/japan/yaponskie_tatu_3.jpg",
        size: sizes.large,
        style: styles.japan.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-1.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-2.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.hand]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-4.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.back]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-6.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-7.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.back]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-9.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-10.jpg",
        size: sizes.large,
        style: styles.keltskiy.name,
        place: [places.shoulder]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-13.jpg",
        size: sizes.medium,
        style: styles.keltskiy.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-20.jpg",
        size: sizes.medium,
        style: styles.keltskiy.name,
        place: [places.back]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-21.jpg",
        size: sizes.medium,
        style: styles.keltskiy.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-32.jpg",
        size: sizes.medium,
        style: styles.keltskiy.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/keltskiy/chto-oznachayut-keltskie-tatu-i-gde-ih-razmestit-48.jpg",
        size: sizes.medium,
        style: styles.keltskiy.name,
        place: [places.shoulder, places.hand, places.leg]
    },
    {
        src: "sketches/minimalism/2-02.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.back]
    },
    {
        src: "sketches/minimalism/2-03.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.back, places.belly, places.hand, places.leg, places.neck]
    },
    {
        src: "sketches/minimalism/2-03.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.back, places.belly, places.hand, places.leg, places.neck]
    },
    {
        src: "sketches/minimalism/2-04.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.belly, places.hand, places.leg]
    },
    {
        src: "sketches/minimalism/2-07.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [
            places.back,
            places.belly,
            places.hand,
            places.leg,
            places.neck,
            places.shoulder
        ]
    },
    {
        src: "sketches/minimalism/2-09.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [
            places.back,
            places.belly,
            places.hand,
            places.leg,
            places.shoulder
        ]
    },
    {
        src: "sketches/minimalism/2-14.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.back, places.belly, places.hand, places.leg]
    },
    {
        src: "sketches/minimalism/4-11.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.back, places.shoulder]
    },
    {
        src: "sketches/minimalism/4-12.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [...Object.values(places).filter((p) => p !== "Лицо")]
    },
    {
        src: "sketches/minimalism/018.jpg",
        size: sizes.medium,
        style: styles.minimalism.name,
        place: [places.hand, places.leg]
    },
    {
        src: "sketches/minimalism/021.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [...Object.values(places).filter((p) => p !== "Лицо")]
    },
    {
        src: "sketches/minimalism/023.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [...Object.values(places).filter((p) => p !== "Лицо")]
    },
    {
        src: "sketches/minimalism/028.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [...Object.values(places).filter((p) => p !== "Лицо")]
    },
    {
        src: "sketches/minimalism/029.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [...Object.values(places).filter((p) => p !== "Лицо")]
    },
    {
        src: "sketches/minimalism/031.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.leg, places.hand, places.neck, places.shoulder]
    },
    {
        src: "sketches/minimalism/034.jpg",
        size: sizes.medium,
        style: styles.minimalism.name,
        place: [
            places.leg,
            places.hand,
            places.shoulder,
            places.back,
            places.belly
        ]
    },
    {
        src: "sketches/minimalism/039.jpg",
        size: sizes.small,
        style: styles.minimalism.name,
        place: [places.leg, places.hand, places.shoulder]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-01-683x1024.jpg",
        size: sizes.medium,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.back]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-02-683x1024.jpg",
        size: sizes.medium,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.back]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-08-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.hand]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-12-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.hand]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-17-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.hand]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-21-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.hand]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-27-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.hand]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-31-683x1024.jpg",
        size: sizes.medium,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.hand, places.shoulder]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-34-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.hand]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-37-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-39-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder]
    },
    {
        src: "sketches/neo-tradishnl/neo-tradishnl-tatu-16-683x1024.jpg",
        size: sizes.large,
        style: styles.neo_tradishnl.name,
        place: [places.leg, places.shoulder, places.hand]
    }
];

export default tatoos;
