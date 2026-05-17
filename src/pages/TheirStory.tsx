import "./about-them.css";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useLanguage } from "../LanguageContext";
import heroImg from "../../assets/themStory1.jpeg";
import timelineImg1 from "../../assets/timelineImg1.jpeg";
import timelineImg2 from "../../assets/timelineImg2.jpeg";
import timelineImg3 from "../../assets/timelineImg3.jpeeg.png";
import timelineImg4 from "../../assets/timelineImg4.jpeg";

import littleMomentImage1 from "../../assets/littleMomentImage1.jpeg";
import littleMomentImage2 from "../../assets/littleMomentImage2.jpeg";
import littleMomentImage3 from "../../assets/littleMomentImage3.jpeg";
import littleMomentImage4 from "../../assets/littleMomentImage4.jpeg";
import littleMomentImage5 from "../../assets/littleMomentImage5.jpeg";
import littleMomentImage6 from "../../assets/littleMomentImage6.jpeg";
import littleMomentImage7 from "../../assets/littleMomentImage7.jpeg";
import littleMomentImage8 from "../../assets/littleMomentImage8.jpeg";
import littleMomentImage9 from "../../assets/littleMomentImage9.jpeg";

import nycStamp from "../../assets/nycstamp.jpeg";
const timelineMedia = [
  { image: timelineImg1, credit: "(A): ADD ARTIST 1" },
  { image: timelineImg2, credit: "(A): ADD ARTIST 2" },
  { image: timelineImg3, credit: "(A): ADD ARTIST 3" },
  { image: timelineImg4, credit: "(A): ADD ARTIST 4" },
] as const;
const littleMomentImages = [littleMomentImage1, littleMomentImage2, littleMomentImage3, littleMomentImage4, littleMomentImage5, littleMomentImage6, littleMomentImage7, littleMomentImage8, littleMomentImage9];

type PolaroidOrientation = "portrait" | "landscape" | "square";

type LoreFragment = {
  id: string;
  title: string;
  excerpt: string;
  ageRange: string;
  image: string;
  artist: string;
  is_nsfw?: boolean;
  tag_direction?: "left" | "right";
  polaroid_orientation?: PolaroidOrientation;
  wall_slots?: number;
};

type StoryBeat = {
  id: string;
  era: string;
  range: string;
  title: string;
  body: string;
  mediaIndex?: number;
  mediaType?: "letters";
};

type LetterRecord = {
  label: string;
  title: string;
  body: string;
  note: string;
  signOff: string;
  signOffName: string;
  bodyFontFamily?: string;
  bodyFontStyle?: "normal" | "italic" | "oblique";
  signOffFontFamily?: string;
  signOffFontStyle?: "normal" | "italic" | "oblique";
  to: string;
  from: string;
  fromAddress: string[];
  toAddress: string[];
  stamp: string;
  postmark: string;
  coverStampImage?: string;
};

const letterDraftText = {
  deployment:
    "Dear Goldie,\n\n" +
    "I hope you're all good at home. Miss you. Miss Leo too. Can't believe I'm saying this, but I miss the two fat kings as well. Don't get smug about it.\n\n" +
    "Deployment's going fine. I'm still in one piece, because the last thing I need is you nagging me over another scratch. Got your picture in my pocket. Can't risk looking at it with a fresh scar.\n\n" +
    "Jayce just, again, called me a simp for writing to you \n\n" +
    "Can't care less. He doesn't have a beautiful husband waiting for him at home, does he?\n\n" +
    "Anyway, saw a guy at base with a beard halfway down his face. You'd have hated him on sight. Would've probably said something sarcastic about it in the next breath too, and then I'd have had to drag you out before it turned into a whole thing.\n\n" +
    "Hope you're sleeping alright at home. But don't get used to sleeping without me, though. I'll be back in two weeks. Want to have my hands on your waist. And stop teasing me in your letters, or I'll have to keep you in bed a full day the second I get home.\n\n" +
    "Also found your ring in the plate in the walk-in closet. Don't start screaming that you lost it. I already reminded you.\n\n" +
    "Tell Banana not to piss in my shoes again. And do not start with 'he's just marking his territory' bullshit. Tell Cloud to not chase his own shadow down the stairs again. I'm not there. Nobody can get him back up on his feet if he falls. Tell Leo I know he's been eating more sugar, and I know that's your fault. He better behave.\n\n" +
    "And you need to smoke less. Speaking of that, I also brought one of those fancy Vogue cigarettes of yours with me. For luck.\n\n" +
    "You're my lucky charm, baby.\n\n" +
    "Take care of yourself. And our babies. I'll be home before you guys know it.",
  reply:
    "Dear the man who left me alone with a fat cat, an even chubbier dog, and a little boy who keeps demanding baseball,\n\n" +
    "I was having the absolute worst day of my life at the start of this week and, tragically, found no big biceps to cry on. In moments like this, I blame you and your enthusiasm for chasing men around with ten thousand dollars' worth of government-issued equipment.\n\n" +
    "First, I went to get my croissant from the usual place down the street, the one with the old florist lady who always sings while she waters things. They told me they'd sold out. I nearly cried on the spot. But I was in a YSL suit and refuseed to cry while having a good hair day. So I soldiered on and went to work with nothing but vengeance and a bagel as a miserable substitute.\n\n" +
    "To make matters worse, my intern forgot to put in the order for the fabric I was dying to get my hands on. At that point, the only thing holding back my tears, again, was the suit.\n\n"+
    "When I got home, I found out Banana had not, in fact, peed in your shoes. He peed on your gun. And that was absolutely his way of asserting his dominance. He's so me. Cloud didn't fall, which impressed me, so I rewarded him with an extra bowl of food. Leo, on the other hand, got caught trying on your spare bulletproof vest. I refused to even look.\n\n" +
    "Then, at night, I put on that specific baby blue dress you like and got irritated at myself in the mirror. Because why did you leave me unsupervised and gorgeous? Terrible decision. My waist was serving and you were not there. A complete waste of resources.\n\n" +
    "That led me to one final judgment: I would like my large, brooding husband back immediately. I need my big competent idiot to solve my stupid problems.\n\n" +
    "Anyway. Enough about me. I hope you're eating something green occasionally. Stop eating beef jerky like it counts as fine dining.\n\n"+
    "There's a new rooftop bar open in SoHo, so you are not allowed to do anything heroic out there and die before trying it with me first.\n\n" +
    "I guess all I really want to say is that there are too many things you've missed while you've been away. And somehow, none of them are particularly interesting without you beside me.\n\n" +
    "We're doing fine at home. I hope you're doing fine out there too.\n\n" +
    "Keep the lucky cigarette close. I'd like to smoke it with you when you get back.",
} as const;

const storyLetters = [
  {
    label: "Deployment",
    title: "Marcus to William",
    bodyFontFamily: '"Special Elite", monospace',
    signOffFontFamily: '"Special Elite", monospace',
    to: "William Cartier-Hayes",
    from: "MSG Marcus Hayes",
    fromAddress: [
      "C TROOP, TASK FORCE 88",
      "PSC 468 BOX 1452",
      "APO AP 96346",
      "UNITED STATES",
    ],
    toAddress: [
      "32 Perry Street",
      "New York, NY 10014",
      "UNITED STATES",
    ],
    stamp: "PRIORITY MAIL",
    postmark: "U.S. ARMED POST",
    body: letterDraftText.deployment,
    note: "p/s: stop humping my pillow",
    signOff: "Always yours,",
    signOffName: "Marc.",
  },
  {
    label: "Reply",
    title: "William back home",
    bodyFontFamily: '"Cormorant Infant", serif',
    bodyFontStyle: "italic",
    signOffFontFamily: '"Cormorant Infant", serif',
    signOffFontStyle: "italic",
    to: "MSG Marcus Hayes",
    from: "William Cartier-Hayes",
    fromAddress: [
      "32 Perry Street",
      "New York, NY 10014",
      "UNITED STATES",
    ],
    toAddress: [
      "C TROOP, TASK FORCE 88",
      "PSC 468 BOX 1452",
      "APO AP 96346",
      "UNITED STATES",
    ],
    stamp: "AIR MAIL",
    postmark: "NYC G.P.O.",
    coverStampImage: nycStamp,
    body: letterDraftText.reply,
    note: "p/s: your pillow, indeed, has become a prop in a pathetic little ritual I refuse to discuss further.",
    signOff: "Missed you,",
    signOffName: "Will.",
  },
] satisfies LetterRecord[];

// Viet version
const letterDraftTextVi = {
  deployment:
  "Gửi bé yêu tóc vàng của anh,\n\n" +
  "Anh mong mọi người ở nhà đều ổn. Anh nhớ em. Nhớ cả Leo. Không thể tin được rằng đây là điều anh sắp nói, nhưng anh cũng nhớ hai ông hoàng lông lá bụ bẫm ở nhà lắm. Điều này không có nghĩa là em được bắt đầu lên mặt đâu đấy.\n\n" +
  "Triển khai quân sự lần này ổn. Anh vẫn lành lặn, vì thật sự điều cuối cùng anh cần lúc này là nghe em cằn nhằn nếu anh có vết xước nào đó mới. Anh còn đem theo cả hình em nữa. Cứ nhìn em trong hình là anh tự nhắc bản thân rằng mình không thể bị thương được. Anh thật sự tin rằng em có tí phép thuật nào đó trong cái bộ não thú vị của em, rồi kiểu gì em cũng sẽ tìm được cách chui ra khỏi khung ảnh xong mắng anh tại chỗ vào giây phút đó. Nên thôi, anh tự bảo rằng anh nên cẩn thận thêm thì vẫn hơn.\n\n" +
  "Thằng Jayce, lại lần nữa, mới trêu anh là simp chúa.\n\n" +
  "Anh kệ mẹ nó. Vì nó sao hiểu được tâm lý của người có gia đình, phải không?\n\n" +
  "Quên kể em, hôm trước anh còn thấy thằng nào ở đây với nguyên bộ râu ria lồm xồm dài quá nửa cổ. Anh đã nghĩ nếu em mà ở đây, có lẽ em sẽ móc mỉa gì đó về gã. Rồi anh lại phải nhanh chóng kéo em đi chỗ khác trước khi có cãi nhau.\n\n" +
  "Mà anh đi lâu vậy nên chắc cũng quen ngủ một mình rồi nhỉ. Nhưng đừng có quen quá đấy. Quen quá xong 2 tuần sau anh về nhà lại đòi đuổi anh sang phòng khác ngủ. Anh chỉ muốn ôm em ngủ thôi. À, còn nữa, ngưng luôn cái trò chọc ghẹo anh trong thư đi nhé. Nếu không thì đừng bắt đầu la làng nói em sai rồi khi anh về tới.\n\n" +
  "Còn nữa, anh tìm thấy nhẫn của em trên cái dĩa trang trí trong phòng thay đồ đấy. Anh nhắc rồi đó, đừng có khóc loạn lên ở nhà rồi đi tìm khắp nơi.\n\n" +
  "Nhớ nhắc Banana đừng có tiểu vào giày của anh nữa. Và đừng có mà bắt đầu cái điệp khúc 'nó chỉ đang đánh dấu lãnh thổ thôi' của em. Sẵn thì bảo Cloud ngừng ngay việc tự chơi trò truy đuổi với cái bóng của nó luôn đi. Anh không có ở nhà, nên nó mà ngã lăn ra đó nữa thì chẳng ai đỡ nó dậy nổi đâu. Nhắc cả Leo là anh biết thằng bé hay ăn vụng thêm đồ ngọt đấy, và anh biết em cũng là người tiếp tay cho nó luôn. Bảo nó nghe lời anh, nghe chưa?\n\n" +
  "Còn em thì nên hút ít thuốc lại. À phải rồi thuốc lá, anh lén lút mang theo một điếu thuốc Vogue sang chảnh gì gì của em đấy. Vì anh không vác em theo được, nên anh mang tấm hình cùng thứ luôn kè kè bên em để việc cầu may hiệu quả nhân đôi.\n\n" +
  "Em là bùa may mắn của anh đấy, bé yêu.\n\n" +
  "Ở nhà ngoan. Bảo mấy đứa nhỏ cũng thế. Anh sẽ về sớm thôi",
  reply: 
  "Gửi người đàn ông tồi tệ đã để em lại một mình với một con mèo béo, một con chó còn béo hơn, và một thằng nhóc suốt ngày vòi em phải chơi bóng chày cùng nó,\n\n" +
  "Em đã có một ngày tồi tệ nhất cuộc đời vào đầu tuần này, và bi thảm thay, em chẳng có cặp bắp tay to oành nào để dựa vào mà khóc lóc. Vào những lúc như thế này, em phải nói là em hận anh và cái sự nhiệt tình cuồng dại của anh trong việc mạo hiểm tính mạng chỉ để đuổi theo mấy gã ất ơ nào đó ngoài kia cùng với đống đồ nghề do chính phủ cấp trị giá cả chục nghìn đô.\n\n" +
  "Đầu tiên nhé, em đã đi xuống chỗ gần nhà để mua croissant ăn sáng, cái chỗ gần tiệm hoa và có bà cụ lớn tuổi hay hát lúc tưới hoa ấy. Tiệm bánh nói họ đã hết croissant rồi. Em suýt thì đã rơi lệ ngay tại chỗ. Nhưng em từ chối khóc vào ngày em mặc suit của YSL nên em nuốt ngược nước mắt vào trong và ngẩng cao đầu để đi làm tiếp. Em dã rất căm phẫn, nhưng em cũng chấp nhận làm một việc rất cao cả: em chấp nhận thay croissant bằng cái thảm hại hơn, bagel. Anh cần phải thưởng cho sự tiến hóa này của em khi anh về đến nhà.\n\n" +
  "Để làm mọi chuyện tồi tệ hơn nữa, cô nhóc intern của em đã quên bẵng luôn việc đặt đơn vải, cái loại mà em mong ngóng gần chết bấy lâu nay. Và một lần nữa, bộ suit là lý do ngăn em rơi hai dòng lệ.\n\n" +
  "Tin vui cho anh, và có lẽ cũng cho em, là Banana đã không tiểu vào giày anh! Nhưng nó đã tiểu lên súng của anh. Em rất lấy làm tiếc nhưng đó thật sự chỉ là cách nó khẳng định ai mới là kẻ cầm đầu trong nhà thôi, nên anh không được giận hay mắng nó. Nó như vậy mới đúng là con trai của em. Cloud thì không ngã, ấn tượng phải không? Em cũng thấy vậy, nên em đã thưởng thêm đồ ăn cho nó. Còn Leo hả? Bữa trước em bắt gặp nó lén lút thử áo chống đạn dự phòng của anh. Em quyết định vờ như không thấy.\n\n" +
  "Rồi cho đến tối, em quyết định đi ngủ với chiếc váy màu xanh nhạt anh thích. Em phải nói nhé là em rất bực mình khi phải thấy mình trong gương. Vì tại sao anh lại có thể bỏ em xinh đẹp ở nhà một mình không có ai trông chừng vậy? Một quyết định ngu ngốc. Đây là một việc quá phí phạm tài nguyên và tiềm năng của em.\n\n" +
  "Cũng từ đó, em đi đến kết luận cuối cùng: em muốn chồng em về nhà ngay lập tức. Em cần một gã ngốc to xác nhưng lại cực kỳ hữu dụng ở đây để giải quyết cả tá vấn đề ngốc nghếch này của em.\n\n" +
  "Mà thôi. Nói về em đủ rồi. Giờ tới anh. Em mong anh ở đó vẫn ăn uống đầy đủ. Trước khi anh kịp trả lời lại ở thư tiếp theo thì em nói luôn, thịt bò khô không được tính là đầy đủ đâu đấy.\n\n" +
  "Còn nữa, ở SoHo mới mở thêm quán bar rooftop đó. Nên anh tuyệt đối đừng có chơi trò anh hùng gì đó xong chết dúi ở đâu trước khi kịp đi khám phá chỗ mới ấy cùng em.\n\n" +
  "Nói dài dòng vậy rồi em mới nhận ra ý chính của em thật sự chỉ muốn nói là anh đã bỏ lỡ rất nhiều khi xa nhà đó. Và dù nhiều việc đã xảy ra vậy, em chẳng thấy có gì đủ thú vị như lúc có anh ở đây cùng em và con.\n\n" +
  "Anh nhớ giữ điếu thuốc lá cẩn thận nhé. Em muốn cùng anh hút nó vào ngày anh về.",
} as const;

const storyLettersVi = [
  {
    label: "Deployment",
    title: "Marcus to William",
    bodyFontFamily: '"Special Elite", monospace',
    signOffFontFamily: '"Special Elite", monospace',
    to: "William Cartier-Hayes",
    from: "MSG Marcus Hayes",
    fromAddress: [
      "C TROOP, TASK FORCE 88",
      "PSC 468 BOX 1452",
      "APO AP 96346",
      "UNITED STATES",
    ],
    toAddress: [
      "32 Perry Street",
      "New York, NY 10014",
      "UNITED STATES",
    ],
    stamp: "PRIORITY MAIL",
    postmark: "U.S. ARMED POST",
    body: letterDraftTextVi.deployment,
    note: "p/s: thôi luôn cái trò cưỡi trên gối anh đi nhé.",
    signOff: "Yêu em,",
    signOffName: "Marc.",
  },
  {
    label: "Reply",
    title: "William back home",
    bodyFontFamily: '"Cormorant Infant", serif',
    bodyFontStyle: "italic",
    signOffFontFamily: '"Cormorant Infant", serif',
    signOffFontStyle: "italic",
    to: "MSG Marcus Hayes",
    from: "William Cartier-Hayes",
    fromAddress: [
      "32 Perry Street",
      "New York, NY 10014",
      "UNITED STATES",
    ],
    toAddress: [
      "C TROOP, TASK FORCE 88",
      "PSC 468 BOX 1452",
      "APO AP 96346",
      "UNITED STATES",
    ],
    stamp: "AIR MAIL",
    postmark: "NYC G.P.O.",
    coverStampImage: nycStamp,
    body: letterDraftTextVi.reply,
    note: "p/s: ừm, anh đoán đúng về cái gối rồi và em từ chối khai báo thêm bất kỳ điều gì.",
    signOff: "Em và con nhớ anh,",
    signOffName: "Will.",
  },
] satisfies LetterRecord[];

const loreFragments: LoreFragment[] = [
  {
    id: "frag-01",
    title: "#obsessed",
    excerpt: "William stole Marcus' old patrol shirt. Marcus, once again, forgot how to behave.",
    ageRange: "26-33",
    image: littleMomentImages[0],
    artist: "Ha Vee",
    tag_direction: "left",
    polaroid_orientation: "portrait",
  },
  {
    id: "frag-02",
    title: "Victoria's Secret",
    excerpt: "William made his Victoria's Secret debut. And Marcus had urgent post-show business with his newly crowned Angel.",
    ageRange: "25-32",
    image: littleMomentImages[1],
    artist: "Peen Nut",
    tag_direction: "left",
  },
  {
    id: "frag-03",
    title: "#nha_trang",
    excerpt: "Their honeymoon in Vietnam. Because of work, they had to postpone this until a year after the wedding.",
    ageRange: "27-34",
    image: littleMomentImages[2],
    artist: "Tinh Tú",
    tag_direction: "left",
    polaroid_orientation: "portrait",
  },
  {
    id: "frag-04",
    title: "New Year!",
    excerpt: "They had leftover Christmas wrapping paper and, unfortunately for everyone, free will.",
    ageRange: "28-35",
    image: littleMomentImages[3],
    artist: "Tinh Tú",
    tag_direction: "right",
    polaroid_orientation: "landscape",
  },
  {
    id: "frag-05",
    title: "Bedtime 💤",
    excerpt: "William always sleeps like he's losing a fight in his dreams. Somehow, Marcus still finds this cute after YEARS.",
    ageRange: "27-34",
    image: littleMomentImages[4],
    artist: "Tinh Tú",
    tag_direction: "left",
  },
  {
    id: "frag-06",
    title: "New Tattoo",
    excerpt: "William got bored and tattooed Marcus' last name above his ass. Marcus was thanking God for a month straight.",
    ageRange: "23-30",
    image: littleMomentImages[5],
    artist: "Jeong Han Wook",
    tag_direction: "right",
    polaroid_orientation: "landscape",
  },
  {
    id: "frag-07",
    title: "Shopping Day",
    excerpt: "Marcus knew this shopping trip would cost him 2 hours, 10 bags, and the last of his patience. He still went.",
    ageRange: "20-27",
    image: littleMomentImages[6],
    artist: "Triệu Ann",
    tag_direction: "left",
    polaroid_orientation: "landscape",
  },
  {
    id: "frag-08",
    title: "Post Deployment Routine",
    excerpt: "What they do after each deployment. Not suitable for public broadcasting |▽//)ゝ",
    ageRange: "29-37",
    image: littleMomentImages[7],
    artist: "Đếm Ngược Hai Tháng",
    tag_direction: "left",
    is_nsfw: true,
  },
  {
    id: "frag-09",
    title: "Wedding Portrait",
    excerpt: "A small glimpse of the wedding photoshoot",
    ageRange: "26-33",
    image: littleMomentImages[8],
    artist: "Việt Quất",
    tag_direction: "right",
    polaroid_orientation: "square",
  }
];

const WALL_SLOT_CAPACITY = 4;
const ORIENTATION_SLOT_WEIGHT: Record<PolaroidOrientation, number> = {
  portrait: 1,
  landscape: 2,
  square: 1,
};

function stableHash(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function parseAgeRange(ageRange: string) {
  const numbers = ageRange.match(/\d+/g);
  if (!numbers || numbers.length === 0) return [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY] as const;
  const williamAge = Number(numbers[0]);
  const marcusAge = Number(numbers[1] ?? numbers[0]);
  return [williamAge, marcusAge] as const;
}

function getFragmentOrientation(fragment: LoreFragment): PolaroidOrientation {
  if (fragment.polaroid_orientation === "landscape") return "landscape";
  if (fragment.polaroid_orientation === "square") return "square";
  return "portrait";
}

function getFragmentWallSlots(fragment: LoreFragment) {
  if (typeof fragment.wall_slots === "number" && Number.isFinite(fragment.wall_slots)) {
    const clamped = Math.max(1, Math.min(WALL_SLOT_CAPACITY, Math.round(fragment.wall_slots)));
    return clamped;
  }
  return ORIENTATION_SLOT_WEIGHT[getFragmentOrientation(fragment)];
}

const translations = {
  en: {
    eyebrow: "Main Universe Archive",
    heroTitle: "#cartiercaughthayes",
    heroMeta: [
      { label: "Origin", value: "Westchester / New York" },
      { label: "Current file", value: "Cartier-Hayes home record" },
    ],
    timelineTitle: "Chronology of Us",
    timelineMark: {
      script: "Circa Summer",
      year: "2005",
    },
    newsCopy: {
      section: "Public Sightings",
      title: "A familiar pairing",
      subhead: "Chanel darling William Cartier seen once again with husband Marcus Hayes.",
      body: [
        "Last night, the former runway model and Chanel's youngest head designer appeared in Lower Manhattan beside Hayes, the former NYPD ESU captain known for keeping a notably lower profile.",
        'Witnesses described the pair as "clingy," "affectionate," and "impossible not to notice" as they left a downtown venue shortly after midnight.',
      ],
    },
    quoteKicker: "Private mythology",
    quoteLines: [
      "NEXT-DOOR ORBIT",
      "LETTERS BETWEEN BREAKS",
      "CHOOSING US OUT LOUD",
      "BROOKLYN YEARS",
      "PROPOSAL, WEDDING, HOME",
      "A LOUD HOUSE, STILL IN LOVE",
    ],
    memoryTitle: "Moments",
    timeline: [
      {
        id: "story-beat-neighbors",
        era: "Growing Up",
        range: "Ages 8-15",
        title: "Next-Door Orbit",
        body:
          "They met in a quiet Westchester neighborhood when Marcus' family moved in next door. Marcus was fifteen; William was eight.\n\n" +
          "William declared them best friends on day one. Marcus acted confused, then quietly became the person who always watched out for him.",
        mediaIndex: 0,
      },
      {
        id: "story-beat-distance",
        era: "Distance Years",
        range: "Ages 15-20",
        title: "Letters Between Breaks",
        body:
          "After high school, Marcus left for military service. Coming home meant short reunions, then long stretches apart.\n\n" +
          "In those gaps, William grew up fast. By the time Marcus returned for good, their bond no longer felt like childhood.",
        mediaIndex: 1,
      },
      {
        id: "story-beat-dating",
        era: "Dating",
        range: "Ages 17-24",
        title: "Choosing Us Out Loud",
        body:
          "What followed was a year of hesitation, stubborn pursuit, and tension neither of them could ignore.\n\n" +
          "When they finally started dating, the relationship was messy, ambitious, and alive. Even then, they kept choosing each other.",
        mediaIndex: 2,
      },
      {
        id: "story-beat-brooklyn",
        era: "Building",
        range: "Ages 22-30",
        title: "Brooklyn Years",
        body:
          "After graduation they moved to Brooklyn and built a life with less comfort and more purpose.\n\n" +
          "William pursued fashion. Marcus entered the NYPD academy. They learned how to grow side by side without drifting apart.",
        mediaIndex: 3,
      },
      {
        id: "story-beat-vows",
        era: "Settling In",
        range: "Ages 26-34",
        title: "Proposal, Wedding, Home",
        body:
          "Marcus proposed on their eighth anniversary. A year later they married, then moved into their three-story brownstone in the West Village.\n\n" +
          "The wedding, honeymoon, and new home marked the first season where their long-held plans became tangible.",
        mediaIndex: 2,
      },
      {
        id: "story-beat-now",
        era: "Living The Life",
        range: "Ages 28-36+",
        title: "A Loud House, Still In Love",
        body:
          "Their home grew with Leo, Banana, and Cloud. It is affectionate, noisy, and full of private jokes that never end.\n\n" +
          "Deployments are still the hardest chapter. Every return matters, and they keep building a life that survives each goodbye.",
        mediaType: "letters",
      }
    ] satisfies StoryBeat[],
    letters: storyLetters,
  },
  vi: {
    heroTitle: "#cartiercaughthayes",
    heroIntro:
      "",
    heroMeta: [
      { label: "Khởi điểm", value: "Westchester / New York" },
      { label: "Hồ sơ hiện tại", value: "Cartier-Hayes home record" },
    ],
    timelineTitle: "Chronology of Us",
    timelineMark: {
      script: "Circa Summer",
      year: "2005",
    },
    newsCopy: {
      section: "Public Sightings",
      title: "A familiar pairing",
      subhead: "Chanel darling William Cartier seen once again with husband Marcus Hayes.",
      body: [
        "Last night, the former runway model and Chanel's youngest head designer appeared in Lower Manhattan beside Hayes, the former NYPD ESU captain known for keeping a notably lower profile.",
        'Witnesses described the pair as "clingy," "affectionate," and "impossible not to notice" as they left a downtown venue shortly after midnight.',
      ],
    },
    quoteKicker: "Private mythology",
    quoteLines: [
      "GẶP NHAU Ở NHÀ KẾ BÊN",
      "KHOẢNG CÁCH VÀ CHỜ ĐỢI",
      "CHỌN NHAU MỘT CÁCH RÕ RÀNG",
      "NGÔI NHÀ ỒN ÀO",
      "NHƯNG HẠNH PHÚC",
    ],
    memoryTitle: "Moments",
    timeline: [
      {
        id: "story-beat-neighbors",
        era: "Tuổi thơ",
        range: "8-15 tuổi",
        title: "Gặp nhau ở nhà kế bên",
        body:
          "Họ gặp nhau ở Westchester khi gia đình Marcus chuyển đến ngay sát nhà Cartier. Marcus 15 tuổi, William 8 tuổi.\n\n" +
          "William coi Marcus là bạn thân ngay từ ngày đầu. Marcus giả vờ khó hiểu nhưng luôn là người bảo vệ William.",
        mediaIndex: 0,
      },
      {
        id: "story-beat-distance",
        era: "Những năm xa nhau",
        range: "15-20 tuổi",
        title: "Khoảng cách và chờ đợi",
        body:
          "Sau trung học, Marcus đi nghĩa vụ và thường xuyên xa nhà. Họ chỉ có những lần gặp ngắn rồi lại chia tay.\n\n" +
          "Chính những khoảng trống đó khiến cảm xúc của cả hai thay đổi theo cách không thể quay lại như cũ.",
        mediaIndex: 1,
      },
      {
        id: "story-beat-dating",
        era: "Bắt đầu yêu",
        range: "17-24 tuổi",
        title: "Chọn nhau một cách rõ ràng",
        body:
          "Sau một thời gian giằng co, họ chính thức hẹn hò và cùng chuyển đến Brooklyn để tự xây dựng cuộc sống.\n\n" +
          "William theo đuổi thời trang, Marcus vào NYPD. Dù áp lực lớn, họ vẫn chọn nhau mỗi ngày.",
        mediaIndex: 2,
      },
      {
        id: "story-beat-now",
        era: "Hiện tại",
        range: "28-36+",
        title: "Ngôi nhà ồn ào nhưng hạnh phúc",
        body:
          "Gia đình của họ lớn dần với Leo, Banana và Cloud. Ngôi nhà luôn ồn ào, nhiều tiếng cười và rất nhiều yêu thương.\n\n" +
          "Những lần deployment vẫn là phần khó nhất, nhưng mỗi lần trở về lại khiến họ chắc chắn hơn về cuộc sống đã chọn.",
        mediaType: "letters",
      },
    ] satisfies StoryBeat[],
    letters: storyLettersVi,
  },
} as const;

export default function TheirStory() {
  const { language } = useLanguage();
  const [openLetterIndex, setOpenLetterIndex] = useState<number | null>(0);
  const [wallPage, setWallPage] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [visibleTimelineIds, setVisibleTimelineIds] = useState<string[]>([]);
  const [visibleStaggerIds, setVisibleStaggerIds] = useState<string[]>([]);
  const [nsfwPromptId, setNsfwPromptId] = useState<string | null>(null);
  const [revealedNsfwIds, setRevealedNsfwIds] = useState<string[]>([]);
  const t = translations[language] || translations.en;
  const timelineEntries = t.timeline;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollRoot = document.querySelector<HTMLElement>(".about-story__paper");
    const timelineList = document.querySelector<HTMLElement>(".about-story__timeline-list");
    if (!timelineList) return;

    const timelineRows = Array.from(timelineList.querySelectorAll<HTMLElement>(".about-story__timeline-row"));
    if (timelineRows.length === 0) return;
    setVisibleTimelineIds([]);
    setTimelineProgress(0);

    const getClamp = (value: number) => Math.min(1, Math.max(0, value));

    const updateTimelineProgress = () => {
      const listRect = timelineList.getBoundingClientRect();
      const rootRect = scrollRoot?.getBoundingClientRect();
      const viewportHeight = rootRect?.height ?? window.innerHeight;
      const triggerLine = (rootRect?.top ?? 0) + viewportHeight * 0.36;
      const traveled = triggerLine - listRect.top;
      const rawProgress = traveled / Math.max(listRect.height, 1);
      setTimelineProgress(getClamp(rawProgress));
    };

    updateTimelineProgress();

    const onScroll = () => {
      updateTimelineProgress();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const idsToAdd: string[] = [];
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const timelineId = (entry.target as HTMLElement).dataset.timelineId;
          if (timelineId) idsToAdd.push(timelineId);
        });
        if (idsToAdd.length === 0) return;
        setVisibleTimelineIds((current) => {
          const next = new Set(current);
          idsToAdd.forEach((id) => next.add(id));
          return Array.from(next);
        });
      },
      {
        root: scrollRoot,
        threshold: 0.35,
        rootMargin: "-6% 0px -16% 0px",
      }
    );

    timelineRows.forEach((row) => observer.observe(row));
    scrollRoot?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      scrollRoot?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [timelineEntries]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollRoot = document.querySelector<HTMLElement>(".about-story__paper");
    if (!scrollRoot) return;

    const revealTargets = Array.from(
      scrollRoot.querySelectorAll<HTMLElement>("[data-stagger-id]")
    );
    if (revealTargets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const idsToAdd: string[] = [];
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const staggerId = (entry.target as HTMLElement).dataset.staggerId;
          if (staggerId) idsToAdd.push(staggerId);
        });
        if (idsToAdd.length === 0) return;
        setVisibleStaggerIds((current) => {
          const next = new Set(current);
          idsToAdd.forEach((id) => next.add(id));
          return Array.from(next);
        });
      },
      {
        root: scrollRoot,
        threshold: 0.18,
        rootMargin: "0px 0px -14% 0px",
      }
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [timelineEntries, wallPage, t.letters]);

  const orderedFragments = useMemo(
    () =>
      [...loreFragments].sort((a, b) => {
        const [aWilliamAge, aMarcusAge] = parseAgeRange(a.ageRange);
        const [bWilliamAge, bMarcusAge] = parseAgeRange(b.ageRange);
        if (aWilliamAge !== bWilliamAge) return aWilliamAge - bWilliamAge;
        if (aMarcusAge !== bMarcusAge) return aMarcusAge - bMarcusAge;
        return a.id.localeCompare(b.id);
      }),
    []
  );

  const wallGroups = useMemo(() => {
    const groups: LoreFragment[][] = [];
    let currentGroup: LoreFragment[] = [];
    let usedSlots = 0;

    orderedFragments.forEach((fragment) => {
      const fragmentSlots = getFragmentWallSlots(fragment);
      if (currentGroup.length > 0 && usedSlots + fragmentSlots > WALL_SLOT_CAPACITY) {
        groups.push(currentGroup);
        currentGroup = [];
        usedSlots = 0;
      }
      currentGroup.push(fragment);
      usedSlots += fragmentSlots;
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }, [orderedFragments]);

  const wallCount = wallGroups.length;
  const activeWallPage = wallCount === 0 ? 0 : Math.min(wallPage, wallCount - 1);
  const wallFragments = wallGroups[activeWallPage] ?? [];

  const handleWallPageChange = (pageIndex: number) => {
    if (pageIndex === activeWallPage) return;
    setVisibleStaggerIds((current) => current.filter((id) => !id.startsWith("moment-")));
    setWallPage(pageIndex);
    setNsfwPromptId(null);
    if (typeof window === "undefined") return;
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobileViewport) return;
    requestAnimationFrame(() => {
      document.getElementById("story-moments")?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    });
  };

  const renderLetters = (context: "timeline") => (
    <div className={`about-story__letters-layout about-story__letters-layout--${context}`}>
      {t.letters.map((entry, index) => {
        const staggerId = `${context}-letter-${entry.label}-${index}`;
        const panelId = `story-${context}-letter-panel-${index}`;
        const isOpen = openLetterIndex === index;

        return (
          <article
            key={`${context}-${entry.title}`}
            data-stagger-id={staggerId}
            className={`about-story__letter-sheet ${index === 0 ? "is-primary" : "is-secondary"} ${entry.coverStampImage ? "has-cover-stamp" : ""} ${isOpen ? "is-open" : ""} ${visibleStaggerIds.includes(staggerId) ? "is-visible" : ""}`}
            style={{ "--stagger-index": `${index}` } as CSSProperties}
          >
            <button
              type="button"
              className="about-story__letter-envelope"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenLetterIndex((current) => (current === index ? null : index))}
            >
              <span className="about-story__envelope-back" aria-hidden="true" />
              {entry.coverStampImage ? (
                <span
                  className="about-story__letter-cover-stamp"
                  aria-hidden="true"
                  style={{ backgroundImage: `url(${entry.coverStampImage})` }}
                />
              ) : (
                <span className="about-story__letter-stamp" aria-hidden="true">{entry.stamp}</span>
              )}
              <span className="about-story__letter-postmark" aria-hidden="true">{entry.postmark}</span>

              <div className="about-story__envelope-front">
                <div className="about-story__envelope-sender">
                  <p className="about-story__envelope-name">{entry.from}</p>
                  {entry.fromAddress.map((line) => (
                    <p key={`${entry.title}-${line}`} className="about-story__envelope-line">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="about-story__envelope-recipient">
                  <p className="about-story__envelope-name is-recipient">{entry.to}</p>
                  {entry.toAddress.map((line) => (
                    <p key={`${entry.label}-${line}`} className="about-story__envelope-line is-recipient">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="about-story__letter-header">
                  <span>{entry.label}</span>
                  <span className={`about-story__letter-toggle ${isOpen ? "is-open" : ""}`}>
                    {isOpen ? "Fold" : "Unseal"}
                  </span>
                </div>
              </div>
            </button>

            <div
              id={panelId}
              className={`about-story__letter-content ${isOpen ? "is-open" : ""}`}
            >
              <article className="about-story__letter-paper about-story__letter-paper--trifold">
                <div className="about-story__letter-paper-scroll">
                  <p
                    className="about-story__card-body"
                    style={{
                      fontFamily: entry.bodyFontFamily,
                      fontStyle: entry.bodyFontStyle,
                    }}
                  >
                    {entry.body}
                  </p>
                  <p
                    className="about-story__letter-signoff"
                    style={{
                      fontFamily: entry.signOffFontFamily,
                      fontStyle: entry.signOffFontStyle,
                    }}
                  >
                    {entry.signOff}
                    <br />
                    {entry.signOffName}
                  </p>
                  <p
                    className="about-story__letter-note"
                    style={{
                      fontFamily: entry.bodyFontFamily,
                      fontStyle: entry.bodyFontStyle,
                    }}
                  >
                    {entry.note}
                  </p>
                </div>
              </article>
            </div>
          </article>
        );
      })}
    </div>
  );

  return (
    <main className="about-story relative min-h-screen overflow-hidden">
      <div className="about-story__layout">
        <section className="about-story__paper">
          <section
            className={`about-story__hero ${visibleStaggerIds.includes("hero-intro") ? "is-visible" : ""}`}
            data-stagger-id="hero-intro"
            style={{ "--stagger-index": "0" } as CSSProperties}
            aria-labelledby="story-hero-title"
          >
            <div className="about-story__hero-rule" aria-hidden="true" />
            <div className="about-story__hero-copy">
              <h1 id="story-hero-title" className="about-story__hero-title">
                {t.heroTitle}
              </h1>
            </div>
            <figure className="about-story__hero-figure">
              <img src={heroImg} alt="Close crop of Marcus and William's eyes" />
            </figure>
            <dl className="about-story__hero-meta">
              {t.heroMeta.map((item) => (
                <div className="about-story__hero-meta-item" key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="about-story__editorial about-story__editorial--timeline" id="story-timeline">
            <div className="about-story__timeline-heading">
              <div
                className={`about-story__section-heading ${visibleStaggerIds.includes("heading-timeline") ? "is-visible" : ""}`}
                data-stagger-id="heading-timeline"
                style={{ "--stagger-index": "0" } as CSSProperties}
              >
                <h2 className="about-story__timeline-mark" aria-label={`${t.timelineMark.script} ${t.timelineMark.year}`}>
                  <span className="about-story__timeline-mark-script about-story__timeline-mark-script--circa">
                    Circa
                  </span>
                  <span className="about-story__timeline-mark-year" aria-hidden="true">
                    {t.timelineMark.year.split("").map((digit, index) => (
                      <span
                        className={`about-story__timeline-mark-digit about-story__timeline-mark-digit--${index}`}
                        key={`${digit}-${index}`}
                      >
                        {digit}
                      </span>
                    ))}
                  </span>
                  <span className="about-story__timeline-mark-script about-story__timeline-mark-script--summer">
                    Summer
                  </span>
                </h2>
              </div>
            </div>

            <div
              className="about-story__timeline-list"
              style={{ "--timeline-progress": `${timelineProgress}` } as CSSProperties}
            >
              {timelineEntries.map((entry, index) => {
                const hasTimelineLetters = entry.mediaType === "letters";
                const media = typeof entry.mediaIndex === "number"
                  ? timelineMedia[entry.mediaIndex % timelineMedia.length]
                  : null;
                const isVisible = visibleTimelineIds.includes(entry.id);
                return (
                  <article
                    key={entry.id}
                    id={entry.id}
                    data-timeline-id={entry.id}
                    data-stagger-id={`timeline-${entry.id}`}
                    className={`about-story__timeline-row ${index % 2 === 1 ? "is-flipped" : ""} ${media || hasTimelineLetters ? "has-media" : "no-media"} ${hasTimelineLetters ? "has-letters" : ""} ${isVisible ? "is-visible" : ""}`}
                    style={{ "--stagger-index": `${index}` } as CSSProperties}
                  >
                    <div className="about-story__timeline-marker" aria-hidden="true">
                      <span className="about-story__timeline-dot" />
                      <span className="about-story__timeline-range">{entry.range}</span>
                    </div>

                    <div className="about-story__timeline-content">
                      <p className="about-story__timeline-date">{entry.range}</p>
                      <p className="about-story__timeline-phase">{entry.era}</p>
                      <h3 className="about-story__timeline-title">{entry.title}</h3>
                      <p className="about-story__card-body">{entry.body}</p>
                    </div>

                    {hasTimelineLetters ? (
                      <div className="about-story__timeline-media about-story__timeline-media--letters">
                        {renderLetters("timeline")}
                      </div>
                    ) : media ? (
                      <div className="about-story__timeline-media">
                        <figure className="about-story__timeline-figure">
                          <img
                            src={media.image}
                            alt={`${entry.title} visual`}
                          />
                        </figure>
                        <p className="about-story__timeline-credit">{media.credit}</p>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <section
            className={`about-story__cover-interlude ${visibleStaggerIds.includes("cover-interlude") ? "is-visible" : ""}`}
            data-stagger-id="cover-interlude"
            style={{ "--stagger-index": "1" } as CSSProperties}
            aria-label="Design interlude"
          >
            <div className="about-story__cover-figure about-story__news-spread">
              <figure className="about-story__news-hero-image">
                <img src={timelineImg4} alt="Marcus and William editorial portrait" />
              </figure>

              <div className="about-story__news-title-block">
                <h2 className="about-story__news-title">
                  The
                  <br />
                  Saint
                </h2>
                <p className="about-story__news-byline">Photographed by Tinh Tú</p>
              </div>

              <article className="about-story__news-copy">
                <p className="about-story__news-section">Public Sightings</p>
                <h3>A familiar pairing</h3>
                <p className="about-story__news-subhead">
                  Chanel darling William Cartier seen once again with husband Marcus Hayes.
                </p>
                <p>
                  Last night, the former runway model and Chanel's youngest head designer
                  appeared in Lower Manhattan beside Hayes, the former NYPD ESU captain known
                  for keeping a notably lower profile.
                </p>
                <p>
                  Witnesses described the pair as "clingy," "affectionate," and "impossible
                  not to notice" as they left a downtown venue shortly after midnight.
                </p>
                <dl className="about-story__news-facts">
                  <div>
                    <dt>Issue</dt>
                    <dd>08</dd>
                  </div>
                  <div>
                    <dt>File</dt>
                    <dd>Downtown Archive</dd>
                  </div>
                </dl>
              </article>
            </div>
          </section>

          <section className="about-story__editorial about-story__editorial--memories" id="story-moments">
            <div
              className={`about-story__section-heading ${visibleStaggerIds.includes("heading-moments") ? "is-visible" : ""}`}
              data-stagger-id="heading-moments"
              style={{ "--stagger-index": "1" } as CSSProperties}
            >
              <h2 className="about-story__section-title about-story__memory-heading-title" aria-label={t.memoryTitle}>
                <span aria-hidden="true">Moments</span>
              </h2>
            </div>

            <div className="about-story__moments-layout">

              <div className="about-story__moments-result">
                {wallFragments.length > 0 ? (
                  <>
                    <div className="about-story__moments-wall" aria-live="polite">
                      {wallFragments.map((fragment, index) => {
                        const staggerId = `moment-${activeWallPage}-${fragment.id}`;
                        return (
                        <article
                          key={fragment.id}
                          data-stagger-id={staggerId}
                          className={`about-story__moment-card about-story__moment-card--wall about-story__moment-card--${getFragmentOrientation(fragment)} ${visibleStaggerIds.includes(staggerId) ? "is-visible" : ""}`}
                          style={{
                            "--stagger-index": `${index}`,
                            "--moment-tilt": `${((stableHash(fragment.id) % 9) - 4) * 0.45}deg`,
                          } as CSSProperties}
                        >
                          <span
                            className="about-story__moment-pin"
                            style={{ transform: `translateX(${(stableHash(fragment.id) % 17) - 8}px)` }}
                            aria-hidden="true"
                          />
                          <span
                            className={`about-story__artist-tag ${fragment.tag_direction === "left" ? "is-left" : "is-right"}`}
                          >
                            {`(A) ${fragment.artist}`}
                          </span>
                          <figure
                            className={`about-story__moment-photo about-story__moment-photo--${getFragmentOrientation(fragment)} ${fragment.is_nsfw ? "is-nsfw" : ""} ${fragment.is_nsfw && revealedNsfwIds.includes(fragment.id) ? "is-revealed" : ""}`}
                          >
                            <img src={fragment.image} alt={`${fragment.title} placeholder`} />
                            {fragment.is_nsfw && !revealedNsfwIds.includes(fragment.id) && nsfwPromptId !== fragment.id ? (
                              <button
                                type="button"
                                className="about-story__nsfw-mask"
                                onClick={() => setNsfwPromptId(fragment.id)}
                              >
                                NSFW content. Click to view.
                              </button>
                            ) : null}
                            {fragment.is_nsfw && !revealedNsfwIds.includes(fragment.id) && nsfwPromptId === fragment.id ? (
                              <div className="about-story__nsfw-confirm" role="dialog" aria-label="NSFW confirmation">
                                <p>This is NSFW. View?</p>
                                <div className="about-story__nsfw-actions">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setRevealedNsfwIds((current) =>
                                        current.includes(fragment.id) ? current : [...current, fragment.id]
                                      );
                                      setNsfwPromptId(null);
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setNsfwPromptId(null);
                                    }}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </figure>
                          <div className="about-story__moment-caption">
                            <p className="about-story__memory-tone">Age {fragment.ageRange}</p>
                            <h3 className="about-story__moment-title">{fragment.title}</h3>
                            <p className="about-story__card-body">{fragment.excerpt}</p>
                          </div>
                        </article>
                        );
                      })}
                    </div>

                    {wallCount > 1 ? (
                      <ol className="about-story__wall-pagination" aria-label="Little moments wall pages">
                        {Array.from({ length: wallCount }, (_, pageIndex) => (
                          <li key={`wall-page-${pageIndex}`}>
                            <button
                              type="button"
                              className={`about-story__wall-page ${activeWallPage === pageIndex ? "is-active" : ""}`}
                              onClick={() => handleWallPageChange(pageIndex)}
                              aria-current={activeWallPage === pageIndex ? "page" : undefined}
                            >
                              {pageIndex + 1}
                            </button>
                          </li>
                        ))}
                      </ol>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </section>

          <div className="about-story__memory-marquee" aria-label="Still being written. More memories forming. The story continues.">
            <div className="about-story__memory-marquee-track" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <span key={`memory-marquee-${index}`}>
                  STILL BEING WRITTEN • MORE MEMORIES FORMING • THE STORY CONTINUES •
                </span>
              ))}
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
