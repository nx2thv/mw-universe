import "./about-them.css";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useLanguage } from "../LanguageContext";
import PageCredit from "../components/PageCredit";
import heroImg from "../../assets/themStory1.jpeg";
import timelineImg1 from "../../assets/timelineImg1.jpeg";
import timelineImg2 from "../../assets/timelineImg2.jpeg";
import timelineImg3 from "../../assets/timelineImg3.jpeeg.png";
import timelineImg4 from "../../assets/littleMomentImage2.jpeg";
import timelineImg5 from "../../assets/timelineImg4.jpeg";
import timelineImg6 from "../../assets/timelineImage5.jpeg";

import dividerCamera from "../../assets/camera.png";
import dividerDogtag from "../../assets/dogtag.png";
import dividerKissmark from "../../assets/kissmark.png";
import dividerReceipt from "../../assets/receipt.png";
import dividerAnimal from "../../assets/dogprint.png";

import littleMomentImage1 from "../../assets/littleMomentImage1.jpeg";
import littleMomentImage2 from "../../assets/littleMomentImage3.jpeg";
import littleMomentImage3 from "../../assets/littleMomentImage4.jpeg";
import littleMomentImage4 from "../../assets/littleMomentImage5.jpeg";
import littleMomentImage5 from "../../assets/littleMomentImage6.jpeg";
import littleMomentImage6 from "../../assets/littleMomentImage7.jpeg";
import littleMomentImage7 from "../../assets/littleMomentImage8.jpeg";
import littleMomentImage8 from "../../assets/littleMomentImage9.jpeg";
import littleMomentImage9 from "../../assets/themStory2.jpeg";
import littleMomentImage10 from "../../assets/littleMomentImage10.jpeg";

import nycStamp from "../../assets/nycstamp.jpeg";

type TimelineMedia = {
  image: string;
  credit: string;
  tone?: "black-white";
};

const timelineMedia: TimelineMedia[] = [
  { image: timelineImg1, credit: "(A): Tinh Tú" },
  { image: timelineImg2, credit: "(A): Tinh Tú" },
  { image: timelineImg3, credit: "(A): Tinh Tú" },
  { image: timelineImg4, credit: "(A): Peen Nut", tone: "black-white" },
  { image: timelineImg5, credit: "(A): Tinh Tú" },
  { image: timelineImg6, credit: "(A): Tinh Tú" },
];
const littleMomentImages = [littleMomentImage1, littleMomentImage2, littleMomentImage3, littleMomentImage4, littleMomentImage5, littleMomentImage6, littleMomentImage7, littleMomentImage8, littleMomentImage9, littleMomentImage10];

type PolaroidOrientation = "portrait" | "landscape" | "square";

type LoreFragment = {
  id: string;
  title: string;
  titleVi?: string;
  excerpt: string;
  excerptVi?: string;
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
  bodyPreview: string;
  bodyFull?: string;
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
    "To make matters worse, my intern forgot to put in the order for the fabric I was dying to get my hands on. At that point, the only thing holding back my tears, again, was the suit.\n\n" +
    "When I got home, I found out Banana had not, in fact, peed in your shoes. He peed on your gun. And that was absolutely his way of asserting his dominance. He's so me. Cloud didn't fall, which impressed me, so I rewarded him with an extra bowl of food. Leo, on the other hand, got caught trying on your spare bulletproof vest. I refused to even look.\n\n" +
    "Then, at night, I put on that specific baby blue dress you like and got irritated at myself in the mirror. Because why did you leave me unsupervised and gorgeous? Terrible decision. My waist was serving and you were not there. A complete waste of resources.\n\n" +
    "That led me to one final judgment: I would like my large, brooding husband back immediately. I need my big competent idiot to solve my stupid problems.\n\n" +
    "Anyway. Enough about me. I hope you're eating something green occasionally. Stop eating beef jerky like it counts as fine dining.\n\n" +
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
    titleVi: "#obsessed",
    excerpt: "william stole his husband's shirt",
    excerptVi: "ẻm bận áo cũ của ảnh",
    ageRange: "26-33",
    image: littleMomentImages[0],
    artist: "Ha Vee",
    tag_direction: "left",
    polaroid_orientation: "portrait",
  },
  {
    id: "frag-02",
    title: "#nha_trang",
    titleVi: "#nha_trang",
    excerpt: "that one time they went on a honeymoon in Nha Trang, and it took them a whole year after the wedding to finally go",
    excerptVi: "cái nì i tuần trăng mật ở Nha Trang, cưới dc 1 năm ùi mới đi",
    ageRange: "27-34",
    image: littleMomentImages[1],
    artist: "Tinh Tú",
    tag_direction: "left",
    polaroid_orientation: "portrait",
  },
  {
    id: "frag-03",
    title: "HPNY!!",
    titleVi: "HPNY!!",
    excerpt: "they had some leftover Christmas wrapping paper sooooo",
    excerptVi: "Còn dư cuộn wrap quà giáng sinh nên... ừm",
    ageRange: "28-35",
    image: littleMomentImages[2],
    artist: "Tinh Tú",
    tag_direction: "right",
    polaroid_orientation: "landscape",
  },
  {
    id: "frag-04",
    title: "Bedtime 💤",
    titleVi: "💤",
    excerpt: "William sleeps UGLY ASL, but Marcus never fails to find it adorable smh",
    excerptVi: "em W ngủ siêu xấu nhưng thg ck ẻm lúc nào cx khen cuti =)))))))))",
    ageRange: "27-34",
    image: littleMomentImages[3],
    artist: "Tinh Tú",
    tag_direction: "right",
  },
  {
    id: "frag-05",
    title: "New Tattoo",
    titleVi: "@Hayes",
    excerpt: "new tattoo alert (^^ゞ",
    excerptVi: "em W xăm họ anh M (^^ゞ",
    ageRange: "23-30",
    image: littleMomentImages[4],
    artist: "Jeong Han Wook",
    tag_direction: "right",
    polaroid_orientation: "landscape",
  },
  {
    id: "frag-06",
    title: "shopping(?)",
    titleVi: "i sốp ping",
    excerpt: "Marcus was, once again, doing unpaid bodyguard work",
    excerptVi: "nhìn là biết tự nguyện đi theo chứ k hề bị ép",
    ageRange: "20-27",
    image: littleMomentImages[5],
    artist: "Triệu Ann",
    tag_direction: "left",
    polaroid_orientation: "landscape",
  },
  {
    id: "frag-07",
    title: "post-deployment",
    titleVi: "post-deployment",
    excerpt: "What they do after each deployment. Not suitable for public broadcasting |▽//)ゝ",
    excerptVi: "thứ hai ảnh làm sau mỗi lần Marcus trở về từ nhiệm vụ. tui 0 dám để công khai |▽//)ゝ",
    ageRange: "29-37",
    image: littleMomentImages[6],
    artist: "Đếm Ngược Hai Tháng",
    tag_direction: "left",
    is_nsfw: true,
  },
  {
    id: "frag-08",
    title: "Wedding Portrait",
    titleVi: "Ưedding Portrait",
    excerpt: "A small glimpse of the wedding photoshoot",
    excerptVi: "cms đám cưới đầu tiên của mí ảnh",
    ageRange: "26-33",
    image: littleMomentImages[7],
    artist: "Việt Quất",
    tag_direction: "left",
    polaroid_orientation: "square",
  },
  {
    id: "frag-09",
    title: "s/o to NTT",
    titleVi: "s/o to NTT",
    excerpt: "gift from arttrade ♡ॢ₍⸍⸌̣ʷ̣̫⸍̣⸌₎",
    excerptVi: "Sếp Tùng tặng 2 gã gay ♡ॢ₍⸍⸌̣ʷ̣̫⸍̣⸌₎",
    ageRange: "30-37",
    image: littleMomentImages[8],
    artist: "Việt Quất",
    tag_direction: "left",
    polaroid_orientation: "portrait",
  },
  {
    id: "frag-10",
    title: "s/o Tinh Tú",
    titleVi: "s/o Tinh Tú",
    excerpt: "gift from arttrade and cms <丶｀∀´>",
    excerptVi: "vk iu Tinh Tú tặng tui!! <丶｀∀´>",
    ageRange: "30-37",
    image: littleMomentImages[9],
    artist: "Tinh Tú",
    tag_direction: "left",
    polaroid_orientation: "portrait",
  },
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
      { label: "FROM", value: "WESTCHESTER, NY" },
      { label: "TO", value: "WEST VILLAGE, NYC" },
    ],
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
        era: "First Meeting",
        range: "Ages 8-15",
        title: "Tree & Button",
        bodyPreview:
          "They met in a quiet Westchester neighborhood when Marcus' family moved in next door. Marcus was fifteen; William was eight.\n\n" +
          "William declared them best friends on day one. Marcus looked mildly alarmed by the announcement, then ended up spending the next several years acting like a very large, very overprotective bodyguard.",
        bodyFull:
          "William, meanwhile, was simply delighted to finally have a friend tall enough to reach the top shelf.\n\n" +
          "The little blond immediately named Marcus 'Tree.' He then insisted Marcus name him back, because apparently that was how best friends worked ᕕ( ᐛ )ᕗ. Marcus — confused, awkward, and clearly unequipped for negotiations with eight-year-olds — eventually settled on 'Button.' William loved it. Marcus would later regret giving him that level of emotional power.",
        mediaIndex: 0,
      },
      {
        id: "story-beat-distance",
        era: "Goodbye",
        range: "Ages 11-18",
        title: "The Last Bit of Childhood",
        bodyPreview:
          "After high school, Marcus left for military service. Their final goodbye came with a hug, too many tears, and one very serious parting gift.\n\n" +
          "William handed him Mr. Grey, his favourite seal plushie, with the solemn belief that Mr. Grey would protect Marcus in his place. If William couldn’t go with him, then the seal would.",

        bodyFull:
          "Mr. Grey was more than a gift. He was the end of childhood folded into something soft. To eleven-year-old William, that plushie was a whole world: comfort, company, safety, everything small enough to hold when the world felt too big.\n\n" +
          "And when Marcus had to leave, William gave that world to him.\n\n" +
          "Marcus promised he would take care of Mr. Grey. Promised he would bring him home in one piece at the end of deployment. Then he left with his duffel, his orders, his responsibilities, and William’s entire childhood tucked carefully under one arm.",
        mediaIndex: 5,
      },
      {
        id: "story-beat-dating",
        era: "Dating",
        range: "Ages 17-24",
        title: "Brooklyn and The Dreamers",
        bodyPreview:
          "Marcus was discharged from the military at twenty. Only when he returned home then did he realise just how much the little blond kid from next door had changed. William, meanwhile, slowly began to understand that whatever he felt for Marcus was no longer childish attachment.\n\n" +
          "They only started dating after Marcus spent far too long overthinking and wrestling with his own moral codes, while William tried with everything he had to prove that, young as he was, he fully understood what he was choosing.",
        bodyFull:
          "After William graduated high school and Marcus graduated from the New York Police Academy, they decided to move into New York City together. Both families offered to help with rent, because everyone knew exactly how brutal NYC housing could be, but they refused. Apparently pride and love had combined into one shared delusional illness. (´～｀ヾ)\n\n" + "Truthfully, they had no money, no furniture worth mentioning, and no real plan beyond surviving the next bill. But they had each other.\n\n" +
          "Marcus worked day and night at the precinct while William split himself between school, flights, cities, and runway shows. Around then, the darker side of the spotlight began to swallow him whole. Addiction, disordered eating, stalkers following too closely — they became almost ordinary to him, or maybe William was simply too exhausted to care anymore.\n\n" + "When one stalker encounter sent William to the hospital, Marcus finally understood how much his boyfriend had been carrying alone. The man went to prison. William came home to rest. And their life together had to become softer, not just stronger.",
        mediaIndex: 1,
      },
      {
        id: "story-beat-brooklyn",
        era: "Building",
        range: "Ages 23-30",
        title: "Familiarity",
        bodyPreview:
          "After Marcus made the news for taking down William’s stalker, his name started moving through the department faster than he expected. By thirty, he had been promoted to ESU Captain.\n\n" +
          "William, meanwhile, entered what he lovingly called his stay-at-home boyfriend era. He still walked shows and took select jobs, but no longer treated survival like part of the work.",
        bodyFull:
          "This was the era of side quests: rooftop bars, raves, midnight walks, movie nights ruined by their unsolicited commentary, and one extremely permanent decision where William got Marcus’ last name tattooed. He also soft-launched Marcus online, and the internet immediately lost its mind.\n\n" +
          "During these years, William became the first male model to walk Victoria’s Secret. Marcus complained about the outfits half the time. The other half, he stood there staring at his boyfriend like a man silently thanking whatever past-life version of himself had earned this.\n\n" +
          "With his career finally taking off, William spoiled Marcus with a brand-new Hellcat: part quiet thank-you to the man who had pulled him out of the dark, part early warning that Marcus was about to become an unpaid chauffeur.",
        mediaIndex: 3,
      },
      {
        id: "story-beat-vows",
        era: "Marriage",
        range: "Ages 25-32",
        title: "'Yes, I Do'",
        bodyPreview:
          "Marcus proposed on their eighth anniversary. By then, they finally had enough to choose a home together: a three-storey brownstone on Perry Street in the West Village. They moved in first. A year later, they got married.\n\n" +
          "Marriage did not calm them down. It simply gave their chaos a permanent address.",
        bodyFull:
          "First came Banana: a grey British Shorthair who wandered in through the back door while they were doing something deeply inappropriate in the kitchen. Marcus wanted him out. William wanted him kept. The winner should be obvious. ヽ║ ˘ _ ˘ ║ノ Banana became their first child before anyone had time to file an objection.\n\n" +
          "Then came the marital side quests: William arriving at Marcus’ birthday dinner in an inflatable seal costume; Marcus renting a Vespa during their Vietnam honeymoon to drive William around, despite being a 6’3 man built far beyond the vehicle’s emotional capacity; both of them attending a Pitbull concert, where William wore a skin-toned bald cap for reasons still under investigation; and William convincing Marcus to sneak back into their old Brooklyn apartment, only for the landlord to catch them and send them fleeing like criminals. By morning, William’s father — the NYPD Chief — had received a patrol report and called to lecture them both. Mostly Marcus.\n\n" +
          "Additional incidents exist. Legal counsel, with great concern, has advised against recording all of them here.\n\n" +
          "But above everything else, they found each other again. Not as the little blond boy and the oversized bodyguard from next door. Not as two young men fighting rent, distance, work, and their own terrible coping mechanisms. But as husbands. With a home. A cat. Too many keys. And a life that kept getting louder because, at last, they had room for all of it.",
        mediaIndex: 2,
      },
      {
        id: "story-beat-now",
        era: "Home",
        range: "Ages 28-35+",
        title: "What Now?",
        bodyPreview:
          "At thirty-four, Marcus stood between two choices. One was a higher position in the NYPD, the kind that came with press conferences, charity events, polite handshakes, and distance from the gunfire. The other was an invitation to join Delta, the most elite force in the U.S. military, pulling him back toward the work he had known for years.\n\n" +
          "Marcus hesitated for a long time, but in the end, he chose Delta with the support of William, his parents, and his in-laws. Around the same time, their home grew louder: they adopted Leo, a boy with a difficult past. Then came Cloud, a fat, foolish Samoyed. And all at once, somehow, they became a real household.",
        bodyFull:
          "Marcus is now a Delta operator. William still works at Chanel while also teaching at Parsons. Their house is always loud, always busy, and somehow runs with shocking efficiency despite nobody understanding how.\n\n" +
          "Marcus leaving for missions is hard on both of them. But William never complains. He does what needs to be done to make family life look normal even when one person is missing: school runs, homework, fittings, lesson plans, pets, groceries, packed lunches, bedtime routines, and all the invisible work that keeps their home alive.\n\n" +
          "William becomes the operating system of the house, simply because he knows Marcus spends every day waiting to come home. So William does everything he can to make it a place worth fighting for, and worth coming back to.\n\n" +
          "Together, they build a life so full it can hardly stay quiet anymore. Love, laughter, noise, fear, duty, and ordinary routines — all of it lives under the same roof. Without either one of them, this house would never have become something this whole.",
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
      { label: "TỪ", value: "WESTCHESTER, NY" },
      { label: "ĐẾN", value: "WEST VILLAGE, NYC" },
    ],
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
        era: "Gặp Mặt",
        range: "Ages 8-15",
        title: "Tree & Button",
        bodyPreview:
          "Họ gặp nhau lần đầu ở khu dân cư yên tĩnh tại Westchester khi gia đình Marcus chuyển tới kế bên nhà Cartier. Marcus lúc này 15 tuổi; William thì mới 8.\n\n" +
          "William tuyên bố dường như là ngay tức thì rằng họ bây giờ chính thức là bạn thân. Marcus có vẻ hơi hoảng hốt trước tuyên bố đột ngột này. Thế nào mà rồi cuối cùng anh vẫn dành những năm tháng tiếp theo làm người bạn thân to lớn, kiêm vệ sĩ của cu cậu tóc vàng.",
        bodyFull:
          "Trong khi đó, William thì chỉ vô cùng vui vẻ khi cuối cùng cậu nhóc cũng có người bạn đủ cao lớn để với tay lấy đồ trên kệ cao.\n\n" +
          "Cu cậu cũng đặt cho Marcus biệt danh là 'Tree'. Xong, cậu còn đòi Marcus cũng phải đặt biệt danh cho cậu, vì đó là điều bạn thân làm mà ᕕ( ᐛ )ᕗ. Cuối cùng Marcus, vốn đã bối rối, vụng về, và rõ ràng là chẳng có cách đối phó với trẻ em, đã đặt nickname cho William là 'Button.' William siêu thích cái tên đó. Còn Marcus sẽ sớm hối hận vì đã chiều theo cậu nhóc quá nhiều.",
        mediaIndex: 0,
      },
      {
        id: "story-beat-distance",
        era: "Tạm Biệt",
        range: "Ages 11-20",
        title: "Chương Cuối Cùng của Tuổi Thơ",
        bodyPreview:
          "Hết cấp 3, Marcus nhập ngũ. Khoảnh khắc cuối cùng của cả hai bao gồm một cái ôm thật chặt, rất nhiều nước mắt, cùng với đó là một món quà William rất nghiêm túc giao cho Marcus.\n\n" +
          "Cu cậu gửi cho người bạn thân to lớn con thú bông hải cẩu của mình, Mr. Grey. William tin rằng nếu cậu không thể đi cùng để bảo vệ Marcus, vậy thì Mr. Grey sẽ làm nhiệm vụ cao cả đó thay cho cậu.",
        bodyFull:
          "Con hải cẩu có thể chỉ là một món đồ chơi bình thường trong mắt người lớn. Nhưng đối với William, một đứa trẻ mon men mới 11 tuổi, thì Mr. Grey là cả thế giới. Chú hải cẩu bông đã luôn bảo vệ cậu mỗi tối khỏi con quái vật dưới gầm giường, cũng là tri kỉ bầu bạn cùng William khi cậu lảm nhảm về những chuyện nhỏ nhặt thường nhật, và ti tỉ thứ khác biến Mr. Grey thành một phần không thể thiếu bên William.\n\n" +
          "Nhưng khi Marcus phải rời đi, William đã không ngần ngại trao cả thế giới đó cho Marcus\n\n" +
          "Marcus nhận con thú bông với lời hứa chắc nịch rằng anh sẽ chăm sóc nó kĩ lưỡng và đem nó về toàn vẹn sau 2 năm. Rồi anh rời đi, mang theo đó là hành lý, trách nhiệm và cả tuổi thơ mơ mộng của William dưới gót chân.",
        mediaIndex: 5,
      },
      {
        id: "story-beat-dating",
        era: "Hẹn Hò",
        range: "Ages 17-24",
        title: "Brooklyn và Những Kẻ Mộng Mơ",
        bodyPreview:
          "Marcus xuất ngũ vào năm 20 tuổi. Và chỉ đến khi ấy, anh mới nhận ra cậu nhóc tóc vàng ngày xưa đã thay đổi nhiều đến nhường nào. William cũng dần phát hiện cảm tình mình dành cho Marcus.\n\nNhưng cả hai chỉ thật sự bắt đầu yêu nhau sau khi Marcus dành quá nhiều thời gian đắn đo suy nghĩ, còn William thì nỗ lực hết sức để chứng minh rằng cậu hoàn toàn ý thức được lựa chọn của bản thân dù vẫn còn rất trẻ.",
        bodyFull:
          "Sau khi William tốt nghiệp cấp 3 và Marcus tốt nghiệp Học Viện Cảnh Sát New York (NYPD), họ quyết định chuyển đến thành phố New York sống cùng nhau. Dẫu cho gia đình cả hai đã ngỏ lời giúp đỡ với tiền thuê nhà (vì ai cũng biết giá nhà ở NYC khốc liệt cỡ nào), nhưng họ từ chối. Chắc lòng tự trọng và tình yêu đã làm họ mắc căn bệnh hoang tưởng (´～｀ヾ)\n\n" +
          "Căn hộ họ thuê ở Brooklyn khi đó vừa nhỏ, vừa ồn ào, lại còn thiếu tiện nghi. Phòng ngủ thì chỉ đủ to để lót tấm nệm, còn chẳng vừa nổi nửa cái khung giường, mà nếu phòng có to hơn thì họ cũng chẳng có đủ tiền để mua nó. Trong nhà còn có một con chuột đuổi mãi không đi, nên William đã đặt tên cho nó là 'Gucci.' Cách âm thì rõ là quá xa xỉ, nên ai cãi nhau ở nhà nào họ đều hóng được hết, thôi thì cũng coi như trong họa có phúc. Thật sự thì lúc này họ chẳng có tiền, cũng chẳng có đồ đạc gì thực sự, nhưng họ có nhau.\n\n" +
          "Marcus làm việc ngày đêm ở sở cảnh sát, trong khi đó William thì vừa học, vừa bay qua lại giữa các thành phố để diễn show. Mặt tối của ánh hào quang cũng nhanh chóng nuốt chửng lấy cậu vào khoảng thời gian này. Nghiện ngập, rối loạn ăn uống, những kẻ quái gỡ theo đuôi là chuyện thường đối với cậu, hoặc có lẽ William đã quá mệt mỏi để quan tâm.\n\n" +
          "Chuyện gì đến cũng đến, William phải nhập viện vì một trong những kẻ quái gỡ đó. Marcus lúc này mới nhận ra bạn trai mình đã trải qua những gì trong khoảng thời gian cả hai quá bận rộn với công việc và quên đi mất cách quan tâm nhau. Kẻ theo đuôi kia bị Marcus tống vào tù. Còn William cuối cùng cũng chấp nhận rằng bản thân mình đã kiệt quệ và quyết định dành thời gian tịnh dưỡng ở nhà. Từ ấy, họ dần học cách cân bằng giữa công việc và đời tư.",
        mediaIndex: 1,
      },
      {
        id: "story-beat-brooklyn",
        era: "Xây Dựng",
        range: "Ages 23-30",
        title: "Quen Thuộc",
        bodyPreview:
          "Sau khi Marcus lên báo nhờ việc bắt gọn kẻ theo đuôi William, tên tuổi của anh nhanh chóng được các cấp trên để mắt đến. Khi 30, anh đã được thăng chức làm Đội trưởng Đơn vị Khẩn cấp (ESU).\n\n" +
          "William thì bước vào giai đoạn mà cậu nhàn nhã ở nhà làm nội trợ bán thời gian. Tất nhiên là cậu vẫn đi diễn, thời trang đối với William là tất cả, nhưng cậu không bán mạng làm việc như trước nữa.",
        bodyFull:
          "Họ dành nhiều thời gian hơn để đi khắp nơi cùng nhau. NYC gần như là quen mặt cả hai: từ rooftop bars, raves, dạo phố lúc 2 giờ sáng để tìm đồ ăn khuya, tới những buổi xem phim ở nhà khi họ xem thì ít mà chê thì nhiều. William cũng ra một quyết định khá táo bạo là xăm họ Marcus lên người mình. Cậu cũng dần công khai Marcus với mạng xã hội và tất nhiên ai cũng rất vui mừng cho cậu.\n\n" +
          "Trong mấy năm này, William cũng được mời làm người mẫu nam đầu tiên cho Victoria’s Secret. Marcus dành ra phải quá nửa thời gian để cằn nhằn và than phiền về mấy bộ đồ diễn. Nửa còn lại thì ảnh đứng đó vừa nhìn bạn trai mình vừa cảm ơn bản thân của kiếp trước đã tích đủ phước để được ban ân huệ này.\n\n" +
          "Sự nghiệp phất lên như diều gặp gió nên William cũng chiều chuộng Marcus bằng con Hellcat mới tinh. Con xe tượng trưng cho lời cảm ơn thầm lặng của cậu gửi tặng Marcus vì anh đã vực William dậy khỏi vực sâu. Nó cũng là cảnh báo cho việc Marcus sắp trở thành tài xế không công.",
        mediaIndex: 3,
      },
      {
        id: "story-beat-vows",
        era: "Hôn NHân",
        range: "Ages 25-32",
        title: "'Em Đồng Ý'",
        bodyPreview:
          "Marcus cầu hôn vào dịp kỉ niệm 8 năm yêu nhau. Chỉ đến tận bấy giờ, họ mới có đủ điều kiện để chọn một ngôi nhà: một căn browstone ba tầng ở phố Perry thuộc West Village. Họ chuyển vào đó trước. Một năm sau thì chính thức làm đám cưới.\n\n" +
          "Người ta bảo cưới nhau sẽ làm tình yêu bớt cuồng nhiệt lại. Đáng tiếc thay, đó không phải là trường hợp của 2 con người này.",
        bodyFull:
          "Đầu tiên là họ đã nhận nuôi một con mèo Anh lông xám khi họ đang xoxo trong bếp thì nó đi vào từ cửa sau. Marcus đòi đuổi nó đi. William thì đòi giữ nó lại. Đoán coi ai thắng ヽ║ ˘ _ ˘ ║ノ. Con mèo được đặt tên là Banana, nó là đứa con đầu tiên của họ\n\n" +
          "Tiếp theo thì đây là sơ sơ những thứ họ làm cho nhau... hoặc cùng nhau: William mặc bộ đồ bơm hơi hình hải cẩu tới ăn sinh nhật của Marcus, Marcus thuê chiếc Vespa khi cả hai đi trăng mật ở Việt Nam để chở William đi chơi (hãy tưởng tượng 1 gã cao 1m9 nặng gần 100kg ngồi trên con xe bé ti), cả hai đi concert Pitbull và William đội cái nón màu da để làm đầu trọc (???), William rủ Marcus lẻn vào lại căn hộ khi trước họ ở Brooklyn xong bị chủ nhà phát hiện khiến cả hai chạy trối chết. Sáng hôm sau, bố William — cảnh sát trưởng NYPD — nhận được thông báo từ cảnh sát tuần tra rồi gọi mắng hai đứa một trận. Thật ra chủ yếu là Marcus bị mắng.\n\n" +
          "Tất nhiên là còn nhiều chuyện khác nữa. Nhưng cố vấn pháp lý của họ, với sự quan ngại sâu sắc, đã khuyến cáo họ không nên kể hết ở đây.\n\n" +
          "Trên tất cả, họ đã tìm thấy nhau lần nữa. Không còn là cậu nhóc tóc vàng nhỏ bé và cậu thiếu niên to lớn nhà bên nữa. Cũng không còn là những chàng trai trẻ vật lộn với tiền thuê nhà, khoảng cách, công việc và những cơ chế đối phó tồi tệ của chính mình. Mà giờ đây, họ đã là những người chồng. Với một ngôi nhà. Một con mèo quá khổ. Quá nhiều chìa khóa. Và một cuộc sống ngày càng ồn ào hơn vì cuối cùng họ cũng có chỗ cho tất cả những thứ đó.",
        mediaIndex: 2,
      },
      {
        id: "story-beat-now",
        era: "Gia Đình",
        range: "Ages 27-34+",
        title: "Hiện Tại Thì Sao?",
        bodyPreview:
          "Ở tuổi 34, Marcus đứng giữa hai lựa chọn. Một là vị trí cao hơn trong NYPD mà đi cùng với đó là những buổi họp báo, những buổi từ thiện, những cái bắt tay lịch sự và rời xa súng đạn. Hai là lá thư mời gia nhập Delta, lực lượng tinh nhuệ nhất của quân đội Mỹ, kéo anh trở lại với công việc mà anh đã quen thuộc suốt bao năm qua.\n\n" +
          "Marcus đã đắn đo rất lâu, nhưng cuối cùng anh đã chọn Delta với sự ủng hộ của cả William, bố mẹ anh và bố mẹ chồng. Cùng khoảng thời gian đó, ngôi nhà của họ cũng ngày càng ồn ào hơn: họ nhận nuôi Leo, cậu nhóc với quá khứ không mấy tốt đẹp. Rồi đến Cloud, chú chó Samoyed béo ú ngốc nghếch. Và bỗng chốc, họ đã trở thành một hộ gia đình thực thụ.",
        bodyFull:
          "Marcus giờ đây là một lính đặc nhiệm Delta. William thì vẫn làm việc tại Chanel, đồng thời cũng dạy học tại Parsons. Ngôi nhà của họ thì luôn ồn áo, náo nhiệt, nhưng vẫn vận hành trơn tru một cách đáng kinh ngạc khiến ai cũng khó hiểu.\n\n" +
          "Việc Marcus phải đi làm nhiệm vụ xa nhà là điều khó khăn với cả hai. Nhưng William chưa bao giờ phàn nàn về điều đó. Cậu vẫn bình tĩnh quán xuyến mọi thứ như bình thường: đưa đón Leo đi học, giúp cậu bé làm bài tập về nhà, đi làm, soạn bài giảng, chăm sóc thú cưng, đi chợ, chuẩn bị cơm trưa, lo chuyện đi ngủ và tất tần tật những công việc không tên khác.\n\n" +
          "William trở thành hệ thống vận hành của gia đình khi Marcus không ở đó, chỉ đơn giản vì cậu biết anh luôn ngóng trông ngày được về với mọi người. Và cho đến khi Marcus trở lại, cậu sẽ gánh vác tất cả để tổ ấm này luôn là nơi đáng để quay về.\n\n" +
          "Cùng nhau, họ xây dựng một cuộc sống đầy ắp đến mức nó gần như không thể yên tĩnh được nữa. Tình yêu, tiếng cười, sự ồn ào, nỗi lo sợ, trách nhiệm và những thói quen thường nhật — tất cả đều sống chung dưới một mái nhà. Nếu thiếu đi một trong hai người, thì có lẽ ngôi nhà này sẽ chẳng bao giờ có được hình dáng tuyệt vời như bây giờ.",

        mediaType: "letters",
      }
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
  const [openTimelineIds, setOpenTimelineIds] = useState<string[]>([]);
  const [visibleStaggerIds, setVisibleStaggerIds] = useState<string[]>([]);
  const [activeChapterId, setActiveChapterId] = useState("story-hero");
  const [chapterOpen, setChapterOpen] = useState(false);
  const [nsfwPromptId, setNsfwPromptId] = useState<string | null>(null);
  const [revealedNsfwIds, setRevealedNsfwIds] = useState<string[]>([]);
  const t = translations[language] || translations.en;
  const timelineEntries = t.timeline;
  const storyChapterItems = useMemo(
    () => [
      {
        id: "story-hero",
        label: language === "vi" ? "Mở Đầu" : "Starting Point",
      },
      {
        id: "story-timeline",
        label: language === "vi" ? "Timeline" : "Timeline",
      },
      {
        id: "story-archive",
        label: "West Village",
      },
      {
        id: "story-public-sightings",
        label: language === "vi" ? "MAGAZINE" : "MAGAZINE",
      },
      {
        id: "story-moments",
        label: language === "vi" ? "Kho Ảnh" : "Gallery",
      },
    ],
    [language]
  );
  const activeChapterLabel =
    storyChapterItems.find((item) => item.id === activeChapterId)?.label ?? storyChapterItems[0]?.label ?? "Chapter";

  const toggleTimelineEntry = (entryId: string) => {
    setOpenTimelineIds((current) =>
      current.includes(entryId)
        ? current.filter((id) => id !== entryId)
        : [...current, entryId]
    );
  };

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
          if (staggerId) {
            idsToAdd.push(staggerId);
            if (staggerId.startsWith("moment-")) idsToAdd.push("heading-moments");
          }
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollRoot = document.querySelector<HTMLElement>(".about-story__paper");
    if (!scrollRoot) return;

    const chapterTargets = storyChapterItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (chapterTargets.length === 0) return;

    const updateActiveChapter = () => {
      const rootTop = scrollRoot.getBoundingClientRect().top;
      const triggerOffset = scrollRoot.clientHeight * 0.24;
      const activeTarget =
        chapterTargets
          .map((target) => ({
            id: target.id,
            offset: target.getBoundingClientRect().top - rootTop - triggerOffset,
          }))
          .filter((item) => item.offset <= 0)
          .sort((a, b) => b.offset - a.offset)[0] ?? { id: chapterTargets[0].id };
      setActiveChapterId((current) => (current === activeTarget.id ? current : activeTarget.id));
    };

    updateActiveChapter();
    scrollRoot.addEventListener("scroll", updateActiveChapter, { passive: true });
    window.addEventListener("resize", updateActiveChapter);

    return () => {
      scrollRoot.removeEventListener("scroll", updateActiveChapter);
      window.removeEventListener("resize", updateActiveChapter);
    };
  }, [storyChapterItems]);

  const handleChapterJump = (chapterId: string) => {
    const target = document.getElementById(chapterId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveChapterId(chapterId);
  };

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
      <div className="about-story__chapter-jump" onMouseLeave={() => setChapterOpen(false)}>
        <button
          type="button"
          className="home-journey-chapter-trigger"
          aria-haspopup="listbox"
          aria-expanded={chapterOpen}
          onClick={() => setChapterOpen((open) => !open)}
        >
          <span className="home-journey-chapter-trigger-kicker">Chapter</span>
          <span className="home-journey-chapter-trigger-current">{activeChapterLabel}</span>
          <span className="home-journey-chapter-trigger-caret" aria-hidden="true">
            {chapterOpen ? "−" : "+"}
          </span>
        </button>
        <div className={`home-journey-chapter-menu ${chapterOpen ? "open" : ""}`} role="listbox">
          {storyChapterItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={activeChapterId === item.id}
              className={`home-journey-chapter-option ${activeChapterId === item.id ? "is-active" : ""}`}
              onClick={() => {
                handleChapterJump(item.id);
                setChapterOpen(false);
              }}
            >
              <span className="home-journey-chapter-option-index" aria-hidden="true">
                {String(index).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="about-story__layout">
        <section className="about-story__paper">
          <section
            id="story-hero"
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
              <figcaption className="about-story__hero-credit">Artwork: Lee Phanh</figcaption>
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
                const isOpen = openTimelineIds.includes(entry.id);
                const fullBody = "bodyFull" in entry ? entry.bodyFull : undefined;
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
                      <p className="about-story__card-body">{entry.bodyPreview}</p>
                      {fullBody ? (
                        <>
                          {isOpen ? (
                            <p className="about-story__timeline-bonus">{fullBody}</p>
                          ) : null}
                          <button
                            type="button"
                            className="about-story__timeline-toggle"
                            aria-expanded={isOpen}
                            onClick={() => toggleTimelineEntry(entry.id)}
                          >
                            {isOpen ? "Fold this era" : "Unfold this era"}
                          </button>
                        </>
                      ) : null}
                    </div>

                    {hasTimelineLetters ? (
                      <div className="about-story__timeline-media about-story__timeline-media--letters">
                        {renderLetters("timeline")}
                      </div>
                    ) : media ? (
                      <div className="about-story__timeline-media">
                        <figure className="about-story__timeline-figure">
                          <img
                            className={media.tone === "black-white" ? "is-black-white" : undefined}
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
            id="story-archive"
            className={`about-story__archive-tear ${visibleStaggerIds.includes("archive-tear") ? "is-visible" : ""}`}
            data-stagger-id="archive-tear"
            style={{ "--stagger-index": "0" } as CSSProperties}
            aria-label="Life in West Village archive"
          >
            <div className="about-story__archive-tear-shadow" aria-hidden="true" />
            <div className="about-story__archive-tear-paper">
              <span className="about-story__archive-tear-surface" aria-hidden="true" />
              <div className="about-story__archive-evidence" aria-hidden="true">
                <img
                  className="about-story__archive-object about-story__archive-object--camera"
                  src={dividerCamera}
                  alt=""
                />
                <img
                  className="about-story__archive-object about-story__archive-object--kiss"
                  src={dividerKissmark}
                  alt=""
                />
                <img
                  className="about-story__archive-object about-story__archive-object--dogtag"
                  src={dividerDogtag}
                  alt=""
                />
                <img
                  className="about-story__archive-object about-story__archive-object--receipt"
                  src={dividerReceipt}
                  alt=""
                />
                <img
                  className="about-story__archive-object about-story__archive-object--animal"
                  src={dividerAnimal}
                  alt=""
                />
              </div>
              <div className="about-story__archive-tear-copy">
                <span className="about-story__archive-william">marc!! where are
                  <br />
                  my rings?
                </span>
                <span className="about-story__archive-marcus">Banana get off
                  <br />
                  the counter now
                </span>
                <span className="about-story__archive-leo">DADDY, PAPA
                  <br />
                  CLOUD ATE MY SOCKS AGAIN!!
                </span>
                <span className="about-story__archive-tear-stamp">From Westchester To Manhattan</span>
                <p className="about-story__archive-note">
                  Somehow, every morning in this house
                  <br />
                  turns into a group project.
                </p>
                <span className="about-story__archive-tear-label">
                  life in
                  <br />
                  west
                  <br />
                  village
                </span>
              </div>
            </div>
          </section>

          <section
            id="story-public-sightings"
            className={`about-story__cover-interlude ${visibleStaggerIds.includes("cover-interlude") ? "is-visible" : ""}`}
            data-stagger-id="cover-interlude"
            style={{ "--stagger-index": "1" } as CSSProperties}
            aria-label="Design interlude"
          >
            <div className="about-story__cover-figure about-story__news-spread">
              <figure className="about-story__news-hero-image">
                <img src={timelineImg5} alt="Marcus and William editorial portrait" />
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
                        const fragmentTitle = language === "vi" ? fragment.titleVi ?? fragment.title : fragment.title;
                        const fragmentExcerpt = language === "vi" ? fragment.excerptVi ?? fragment.excerpt : fragment.excerpt;
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
                              <img src={fragment.image} alt={`${fragmentTitle} visual`} />
                              {fragment.is_nsfw && !revealedNsfwIds.includes(fragment.id) && nsfwPromptId !== fragment.id ? (
                                <button
                                  type="button"
                                  className="about-story__nsfw-mask"
                                  onClick={() => setNsfwPromptId(fragment.id)}
                                >
                                  {language === "vi" ? "Nội dung NSFW. Nhấn để xem." : "NSFW content. Click to view."}
                                </button>
                              ) : null}
                              {fragment.is_nsfw && !revealedNsfwIds.includes(fragment.id) && nsfwPromptId === fragment.id ? (
                                <div className="about-story__nsfw-confirm" role="dialog" aria-label="NSFW confirmation">
                                  <p>{language === "vi" ? "Đây là nội dung NSFW. Xem chứ?" : "This is NSFW. View?"}</p>
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
                                      {language === "vi" ? "Có" : "Yes"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNsfwPromptId(null);
                                      }}
                                    >
                                      {language === "vi" ? "Không" : "No"}
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </figure>
                            <div className="about-story__moment-caption">
                              <p className="about-story__memory-tone">{language === "vi" ? "Tuổi" : "Age"} {fragment.ageRange}</p>
                              <h3 className="about-story__moment-title">{fragmentTitle}</h3>
                              <p className="about-story__card-body">{fragmentExcerpt}</p>
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

          <div className="about-story__page-credit" aria-label="Page credit">
            <PageCredit tone="on-dark" className="page-credit--bottom" />
          </div>

        </section>
      </div>
    </main>
  );
}
