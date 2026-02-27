import { useEffect, useState } from "react";

type TosModalProps = {
    onAccept: () => void;
};

export default function TosModal({ onAccept }: TosModalProps) {
    const [lang, setLang] = useState<"en" | "vi">("en");

    // prevent scroll behind modal
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const tos = {
        en: {
            header: "Terms of Service",
            cta: "I understand",
            sections: [
                {
                    heading: "Overview",
                    body: [
                        "This site is a personal archive, created by me, Ngoc (Vivian) Nguyen, to showcase original characters' briefs, lores, both solo and couple commissions for Marcus Hayes & William Cartier.",
                        "It is also a space for me to share commissions' briefs with artists I may work with in the future.",
                        "No transactions happen on this website. Commission discussion/payment happens via other social platforms.",
                    ],
                },
                {
                    heading: "Ownership",
                    body: [
                        "Marcus Hayes and William Cartier are my original characters (OCs).",
                        "All original concepts, briefs, written content, and page layouts on this site are created by me unless otherwise stated.",
                        "Original characters' briefs and commissions' detailed documents may include image references sourced from publicly available materials. These references are used strictly for visual guidance and remain the property of their respective owners.",
                    ]
                },
                {
                    heading: "Use of briefs",
                    body: [
                        "Do not repost, redistribute, or screenshot-share the briefs.",
                        "My commission briefs are intended solely for artists working with me directly. Any other use, including commissioning third-party artists for personal or commercial projects involving your own OCs or fictional characters, requires my prior approval.",
                        "Artists may only use a commission brief after I confirm via direct message following mutual agreement to collaborate. Silence or lack of response does not constitute permission.",
                        "Modifications on briefs are only allowed if I explicitly approve.",
                    ],
                },
                {
                    heading: "Artwork & credit",
                    body: [
                        "Finished artwork belongs to the artist. I retain a non-exclusive right to use the artwork for personal, non-commercial purposes with proper artist credit upon use, unless otherwise agreed upon with the artist.",
                        "The underlying idea/concept remains mine.",
                        "If a third party claims inspiration, credit both me (idea) and the artist (artwork).",
                    ],
                },
                {
                    heading: "AI / scraping prohibition",
                    body: [
                        "No AI training, feeding, scraping, dataset use, or automation of any kind using my concepts or any artwork of artists shown/linked here. No negotiations are welcomed.",
                    ],
                },
                {
                    heading: "Red lines",
                    body: [
                        "Marcus Hayes and William Cartier are a developed pair with a defined relationship.",
                        "Do not take my OCs out of context or ship them with other OCs/characters without my permission.",
                    ],
                },
                {
                    heading: "Legal Standing",
                    body: [
                        "All original characters, briefs, text, and materials displayed on this website are protected under Australian copyright law and applicable international copyright conventions. Unauthorized use, reproduction, redistribution, modification, or AI training is strictly prohibited.",
                        "Copyright in commissioned artwork remains with the respective artists. Such artwork may not be scraped, used for AI training, redistributed, or otherwise exploited by third parties without explicit permission from both the artist and myself."
                    ],
                },
                {
                    heading: "Acceptance of Terms",
                    body: [
                        "By accessing this website, you acknowledge that:",
                        "Viewing does not grant any rights or licences.",
                        "Permission must be explicitly granted.",
                        "If you do not agree with these terms, do not proceed.",
                    ],
                },
            ],
        },

        vi: {
            header: "Điều khoản sử dụng",
            cta: "Mình hiểu rồi",
            sections: [
                {
                    heading: "Tổng quan",
                    body: [
                        "Đây là website lưu trữ cá nhân do mình — Ngọc (Vivian) Nguyễn — tạo ra nhằm mục đích trưng bày và lưu giữ các brief, lore, cũng như những commission solo và couple dành cho Marcus Hayes & William Cartier.",
                        "Website cũng là nơi mình chia sẻ các ý tưởng commission với những artist mà mình có thể hợp tác trong tương lai.",
                        "Không có giao dịch nào diễn ra trực tiếp trên website này. Việc trao đổi và thanh toán commission sẽ được thực hiện thông qua các nền tảng mạng xã hội khác.",
                    ],
                },
                {
                    heading: "Quyền sở hữu",
                    body: [
                        "Marcus Hayes và William Cartier là nhân vật gốc (OC) do mình sáng tạo.",
                        "Toàn bộ idea, nội dung chữ viết và bố cục trang trên website này đều do mình tạo ra, trừ khi có ghi chú khác.",
                        "Các brief (cả cho nhân vật và cho commission) sử dụng hình ảnh tham khảo từ các nguồn công khai. Tuy nhiên, những hình ảnh này chỉ mang tính chất tham khảo/định hướng hình ảnh; mọi quyền sở hữu vẫn thuộc về chủ sở hữu gốc.",
                    ],
                },
                {
                    heading: "Sử dụng brief",
                    body: [
                        "Không được repost, phân phối lại hoặc chia sẻ brief dưới dạng ảnh chụp màn hình.",
                        "Các brief commission của mình chỉ dành cho artist làm việc trực tiếp với mình. Mọi hình thức sử dụng khác, bao gồm commission artist bên thứ ba dưới mục đích cá nhân/thương mại cho nhân vật gốc/nhân vật giả tưởng của bạn, đều cần sự chấp thuận trước của mình. Im lặng hoặc không phản hồi không đồng nghĩa với việc đồng ý/cho phép.",
                        "Artist chỉ được phép làm việc và sử dụng idea trong các brief sau khi mình xác nhận qua tin nhắn riêng (dưới sự đồng thuận của cả hai bên khi artist thể hiện mong muốn được hợp tác và mình chấp thuận sau cuộc trao đổi ngắn).",
                        "Việc chỉnh sửa chi tiết của nhân vật hay brief của commission chỉ được phép khi mình đồng ý rõ ràng.",
                    ],
                },
                {
                    heading: "Artwork & ghi credit",
                    body: [
                        "Artwork hoàn chỉnh thuộc quyền sở hữu của artist. Mình giữ quyền không độc quyền để sử dụng/đăng tải artwork cho mục đích cá nhân, phi thương mại, và sẽ credit artist đầy đủ khi sử dụng/đăng tải, trừ khi có thỏa thuận khác với artist.",
                        "Ý tưởng ban đầu vẫn thuộc về mình.",
                        "Nếu có bên thứ ba sử dụng hoặc lấy cảm hứng từ artwork, vui lòng credit cả mình (idea) và artist (artwork).",
                    ],
                },
                {
                    heading: "Cấm AI / scraping",
                    body: [
                        "Nghiêm cấm mọi hình thức huấn luyện AI, feeding, scraping, tạo dataset hoặc tự động hoá sử dụng bất kỳ artwork nào của artist được trưng bày hoặc liên kết trên website này. Không nhận thương lượng/ngoại lệ.",
                    ],
                },
                {
                    heading: "Giới hạn & nguyên tắc",
                    body: [
                        "Marcus Hayes và William Cartier là một cặp đôi đã được xây dựng với mối quan hệ rõ ràng.",
                        "Nghiêm cấm việc tách OC của mình khỏi ngữ cảnh gốc hoặc ship với OC/nhân vật khác.",
                    ],
                },
                {
                    heading: "Cơ sở pháp lý",
                    body: [
                        "Tất cả nhân vật gốc, concept, idea, nội dung chữ viết và tài liệu hiển thị trên website này đều được bảo vệ bởi luật bản quyền của Úc và các công ước bản quyền quốc tế có liên quan. Mọi hành vi sử dụng, sao chép, phân phối lại, chỉnh sửa hoặc huấn luyện AI khi chưa được cho phép đều bị nghiêm cấm.",
                        "Bản quyền artwork commission thuộc về các artist tương ứng. Artwork không được phép bị scraping, sử dụng cho AI, phân phối lại hoặc khai thác dưới bất kỳ hình thức nào bởi bên thứ ba nếu chưa có sự cho phép rõ ràng từ cả artist và mình.",
                    ],
                },
                {
                    heading: "Chấp nhận điều khoản",
                    body: [
                        "Khi truy cập website này, bạn xác nhận rằng:",
                        "Việc xem nội dung không đồng nghĩa với việc được cấp bất kỳ quyền hoặc giấy phép nào.",
                        "Mọi quyền sử dụng phải được mình cho phép rõ ràng.",
                        "Nếu bạn không đồng ý với các điều khoản trên, vui lòng không tiếp tục truy cập.",
                    ],
                },
            ],
        },
    } as const;

    const content = lang === "en" ? tos.en : tos.vi;

    return (
        <div className="tos-overlay">
            {/* backdrop */}
            <div className="tos-backdrop" />

            {/* card */}
            <div className="tos-card">
                {/* top bar */}
                <div className="tos-topbar">
                    <h2 className="tos-header">{content.header}</h2>

                    <div className="tos-lang">
                        <button type="button" onClick={() => setLang("en")}>EN</button>
                        <button type="button" onClick={() => setLang("vi")}>VI</button>
                    </div>
                </div>

                <div className="tos-body">
                    {content.sections.map((s) => (
                        <section key={s.heading} className="tos-section">
                            <h3 className="tos-section-title">{s.heading}</h3>

                            {s.body.map((line, idx) => (
                                <p key={idx} className="tos-paragraph">{line}</p>
                            ))}

                            <div className="tos-divider" />
                        </section>
                    ))}
                </div>

                {/* bottom action */}
                <div className="tos-actions">
                    <button
                        type="button"
                        onClick={onAccept}
                        className="w-full rounded-xl bg-white text-[#0b1220] py-3 text-xs md:text-sm uppercase tracking-[0.18em] font-semibold hover:bg-white/90 transition"
                    >
                        {content.cta}
                    </button>
                </div>
            </div>
        </div>
    );
}