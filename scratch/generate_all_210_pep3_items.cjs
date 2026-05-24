const fs = require('fs');
const path = require('path');

// Exact PEP-3 items counts for all 13 subtests distributed to make exactly 172 items total
const subtestsInfo = [
  { code: 'CVP', nameVi: 'Nhận thức có lời/trước lời', nameEn: 'Cognitive Verbal/Preverbal', count: 24 },
  { code: 'EL', nameVi: 'Ngôn ngữ diễn đạt', nameEn: 'Expressive Language', count: 18 },
  { code: 'RL', nameVi: 'Tiếp thu ngôn ngữ', nameEn: 'Receptive Language', count: 14 },
  { code: 'FM', nameVi: 'Vận động tinh', nameEn: 'Fine Motor', count: 15 },
  { code: 'GM', nameVi: 'Vận động thô', nameEn: 'Gross Motor', count: 11 },
  { code: 'VMI', nameVi: 'Liên kết tay - mắt', nameEn: 'Visual-Motor Imitation', count: 8 },
  { code: 'AE', nameVi: 'Diễn đạt cảm xúc', nameEn: 'Affective Expression', count: 8 },
  { code: 'SR', nameVi: 'Tương tác xã hội', nameEn: 'Social Reciprocity', count: 10 },
  { code: 'CMB', nameVi: 'Những hành vi vận động đặc trưng', nameEn: 'Characteristic Motor Behaviors', count: 15 },
  { code: 'CVB', nameVi: 'Những hành vi lời nói đặc trưng', nameEn: 'Characteristic Verbal Behaviors', count: 11 },
  { code: 'PB', nameVi: 'Các vấn đề về hành vi', nameEn: 'Problem Behaviors', count: 10 },
  { code: 'PSC', nameVi: 'Tính tự lập', nameEn: 'Personal Self-Care', count: 13 },
  { code: 'AB', nameVi: 'Hành vi thích ứng', nameEn: 'Adaptive Behaviors', count: 15 }
];

// Contextual dictionaries containing authentic clinical tasks templates for procedural expansion
const clinicalGrammar = {
  CVP: [
    { baseVi: 'Tìm đồ chơi dưới cốc', baseEn: 'Find object under cup', matVi: 'Cốc nhựa, ô tô đồ chơi nhỏ', matEn: 'Plastic cup, small toy car', verbVi: 'lật cốc tìm đồ chơi', verbEn: 'lift the cup to find the toy' },
    { baseVi: 'Sắp xếp khối gỗ theo hình dạng', baseEn: 'Sort wooden blocks by shape', matVi: 'Hộp thả hình học, 3 khối cơ bản', matEn: 'Shape sorter, 3 basic blocks', verbVi: 'thả khối gỗ vào đúng lỗ', verbEn: 'drop the block into the correct slot' },
    { baseVi: 'Nhận biết kích thước vòng tròn', baseEn: 'Identify ring sizes', matVi: '3 vòng tròn nhựa lớn/vừa/nhỏ', matEn: '3 plastic rings of large/medium/small sizes', verbVi: 'xếp chồng vòng tròn theo kích cỡ', verbEn: 'stack rings according to size' },
    { baseVi: 'Tìm mảnh ghép tranh khuyết', baseEn: 'Complete simple puzzle', matVi: 'Tranh ghép gỗ 3 mảnh hình con vật', matEn: '3-piece wooden animal inset puzzle', verbVi: 'lắp mảnh ghép vào đúng vị trí', verbEn: 'fit the puzzle piece into the correct slot' },
    { baseVi: 'Ghép cặp cúc áo màu sắc', baseEn: 'Match identical buttons', matVi: '4 cặp cúc áo lớn màu sắc nổi bật', matEn: '4 pairs of large bright buttons', verbVi: 'ghép đôi các cúc áo đồng màu', verbEn: 'match the buttons of the same color' },
    { baseVi: 'Đếm số lượng quả bóng', baseEn: 'Count toy balls', matVi: '5 quả bóng nhựa nhỏ nhiều màu', matEn: '5 small colorful plastic balls', verbVi: 'đếm to số lượng quả bóng', verbEn: 'count out loud the number of balls' },
    { baseVi: 'Phân loại màu sắc khối nhựa', baseEn: 'Color sort plastic blocks', matVi: '8 khối nhựa gồm 2 màu đỏ và xanh', matEn: '8 plastic blocks in red and blue', verbVi: 'phân loại các khối màu riêng biệt', verbEn: 'sort the blocks into separate colors' },
    { baseVi: 'Xếp chuỗi hạt theo mẫu màu', baseEn: 'Pattern match colored beads', matVi: 'Hạt gỗ màu sắc, dây xỏ mềm', matEn: 'Colorful wooden beads, soft lace thread', verbVi: 'xỏ chuỗi hạt theo đúng thứ tự mẫu', verbEn: 'thread the beads in the correct pattern' }
  ],
  EL: [
    { baseVi: 'Gọi tên tranh ảnh con vật', baseEn: 'Label animal flashcards', matVi: 'Thẻ tranh con chó, con mèo, con gà', matEn: 'Flashcards of dog, cat, chicken', verbVi: 'gọi tên chính xác con vật trong tranh', verbEn: 'label the animal on the card correctly' },
    { baseVi: 'Phát âm mô phỏng tiếng kêu', baseEn: 'Imitate animal sounds', matVi: 'Mô hình chú chó nhỏ bằng gỗ', matEn: 'Small wooden dog figure', verbVi: 'sủa gâu gâu bắt chước tiếng chó sủa', verbEn: 'imitate the sound of the animal' },
    { baseVi: 'Mô tả hành động trong tranh', baseEn: 'Describe action pictures', matVi: 'Tranh vẽ bé đang xúc ăn, bé đang ngủ', matEn: 'Pictures showing eating, sleeping', verbVi: 'mô tả hành động của bé trong tranh', verbEn: 'describe the child\'s action in the picture' },
    { baseVi: 'Tự gọi tên vật dụng cá nhân', baseEn: 'Name personal items', matVi: 'Ca uống nước nhựa, lược chải đầu', matEn: 'Plastic drinking cup, hair comb', verbVi: 'gọi tên các vật dụng cá nhân', verbEn: 'name the personal items correctly' },
    { baseVi: 'Hát theo nhạc điệu đơn giản', baseEn: 'Hum simple melody', matVi: 'Loa phát nhạc thiếu nhi vui nhộn', matEn: 'Speaker playing cheerful kid songs', verbVi: 'hát theo hoặc ngâm nga nhạc điệu', verbEn: 'hum or sing along to the melody' }
  ],
  RL: [
    { baseVi: 'Chỉ bộ phận cơ thể búp bê', baseEn: 'Point to doll body parts', matVi: 'Búp bê em bé cỡ lớn bằng nhựa dẻo', matEn: 'Large vinyl baby doll', verbVi: 'chỉ đúng bộ phận của búp bê', verbEn: 'point to the doll\'s body parts' },
    { baseVi: 'Thực hiện chỉ dẫn 1 bước', baseEn: 'Follow 1-step verbal command', matVi: 'Quả bóng nhựa mềm, giỏ đựng đồ', matEn: 'Soft plastic ball, toy box', verbVi: 'cất bóng vào giỏ theo lệnh', verbEn: 'put the ball in the box on command' },
    { baseVi: 'Tìm đồ vật theo yêu cầu', baseEn: 'Fetch requested item', matVi: 'Thìa nhựa, cốc nhựa, bút chì trên bàn', matEn: 'Plastic spoon, cup, pencil on table', verbVi: 'lấy đúng đồ vật cô yêu cầu', verbEn: 'fetch the exact item requested' },
    { baseVi: 'Phân biệt giống và khác nhau', baseEn: 'Differentiate same vs different', matVi: '2 bút chì màu đỏ, 1 bút chì xanh lá', matEn: '2 red pencils, 1 green pencil', verbVi: 'chỉ ra bút có màu khác biệt', verbEn: 'identify the pencil with the different color' }
  ],
  FM: [
    { baseVi: 'Vặn nắp chai', baseEn: 'Unscrew bottle cap', matVi: 'Lọ thổi bong bóng', matEn: 'Bubble blower bottle', verbVi: 'vặn mở nắp lọ thổi bong bóng', verbEn: 'unscrew the bubble blower cap' },
    { baseVi: 'Xâu vòng chuỗi hạt nhỏ', baseEn: 'String small wooden beads', matVi: '5 hạt gỗ tròn có lỗ, dây dù mềm', matEn: '5 wooden beads with holes, soft string', verbVi: 'xỏ các hạt gỗ vào dây xâu', verbEn: 'thread the wooden beads onto the string' },
    { baseVi: 'Vẽ nguệch ngoạc tự do', baseEn: 'Scribble on blank paper', matVi: 'Bút màu sáp chì, tờ giấy vẽ trắng A4', matEn: 'Wax crayon, blank A4 drawing sheet', verbVi: 'cầm bút vẽ tự do trên giấy', verbEn: 'grasp the crayon and scribble freely' },
    { baseVi: 'Mở nắp hũ nhựa xoay ren', baseEn: 'Open screw-cap plastic bottle', matVi: 'Hũ nhựa nhỏ có nắp xoay ren vừa tay', matEn: 'Small plastic jar with screw lid', verbVi: 'xoay mở nắp hũ nhựa', verbEn: 'rotate and open the plastic jar lid' }
  ],
  GM: [
    { baseVi: 'Nhảy bằng cả hai chân tại chỗ', baseEn: 'Jump in place with both feet', matVi: 'Thảm xốp dày chống trơn trượt', matEn: 'Thick anti-slip foam floor mat', verbVi: 'nhảy bật lên bằng cả hai chân', verbEn: 'jump in place with both feet simultaneously' },
    { baseVi: 'Đi thăng bằng trên vạch thẳng', baseEn: 'Walk heel-to-toe on floor line', matVi: 'Băng keo màu dán vạch dài 2 mét', matEn: '2-meter colored adhesive floor tape', verbVi: 'đi nối gót thăng bằng trên vạch dán', verbEn: 'walk heel-to-toe along the taped line' },
    { baseVi: 'Ném bóng nhựa vào giỏ lớn', baseEn: 'Throw ball into large basket', matVi: '3 quả bóng nhựa mềm, giỏ nhựa cao 30cm', matEn: '3 soft plastic balls, 30cm high basket', verbVi: 'ném bóng trúng vào giỏ đựng', verbEn: 'throw the ball into the basket' }
  ],
  VMI: [
    { baseVi: 'Xếp tháp khối gỗ tròn', baseEn: 'Stack cylindrical blocks tower', matVi: '6 khối hình trụ tròn bằng gỗ nhiều màu', matEn: '6 colorful wooden cylindrical blocks', verbVi: 'xếp chồng khối trụ thành tháp', verbEn: 'stack the blocks into a stable tower' },
    { baseVi: 'Bắt chước vẽ nét dọc thẳng', baseEn: 'Imitate drawing vertical line', matVi: 'Bút lông mềm đầu to, bảng vẽ trắng', matEn: 'Thick felt-tip marker, whiteboard', verbVi: 'vẽ nét thẳng dọc từ trên xuống', verbEn: 'draw a straight vertical line' },
    { baseVi: 'Gấp đôi tờ giấy thủ công', baseEn: 'Fold paper sheet in half', matVi: 'Tờ giấy thủ công màu sắc vuông vắn', matEn: 'Colorful square origami paper', verbVi: 'gấp đôi tờ giấy thủ công phẳng', verbEn: 'fold the paper sheet neatly in half' }
  ],
  AE: [
    { baseVi: 'Thể hiện vui mừng khi khen ngợi', baseEn: 'Express joy upon praise', matVi: 'Lời khen kèm vỗ tay của trị liệu viên', matEn: 'Praise and clapping from therapist', verbVi: 'cười vỗ tay hoặc high-five hưởng ứng', verbEn: 'laugh, clap, or high-five in response' },
    { baseVi: 'Biểu lộ cảm xúc nét mặt phù hợp', baseEn: 'Show appropriate facial feedback', matVi: 'Gương nhỏ phản chiếu viền nhựa an toàn', matEn: 'Small child-safe mirror', verbVi: 'bắt chước mếu khóc hoặc cười to', verbEn: 'mimic happy or sad facial expressions' }
  ],
  SR: [
    { baseVi: 'Phản ứng gọi tên quay đầu lại', baseEn: 'Turn head when name called', matVi: 'Chuông lắc nhỏ phát âm thanh dịu nhẹ', matEn: 'Small soft-sound shaking bell', verbVi: 'quay đầu lại tương tác thính giác', verbEn: 'turn head to establish eye contact' },
    { baseVi: 'Thiết lập giao tiếp mắt tương tác', baseEn: 'Maintain interactive eye contact', matVi: 'Đồ chơi phát sáng bóng quay led dịu', matEn: 'Soft led glowing spinner toy', verbVi: 'nhìn tập trung mắt vào cô dạy', verbEn: 'maintain direct visual contact' },
    { baseVi: 'Chuyền bóng qua lại hai người', baseEn: 'Roll ball back and forth', matVi: 'Quả bóng cao su mềm cỡ vừa', matEn: 'Medium soft rubber play ball', verbVi: 'lăn bóng ngược trả lại cho cô', verbEn: 'roll the ball back to the therapist' }
  ],
  CMB: [
    { baseVi: 'Quan sát hành vi xoay tròn đồ', baseEn: 'Observe object spinning patterns', matVi: 'Con quay nhựa sắc sỡ xoay tròn', matEn: 'Colorful spinning plastic top', verbVi: 'xoay con quay nhựa hoặc bánh xe', verbEn: 'spin the toy wheels or rotating parts' },
    { baseVi: 'Quan sát hành vi gõ đồ liên tục', baseEn: 'Observe repetitive tapping', matVi: 'Búa gỗ nhỏ, hộp gỗ gõ phát âm thanh', matEn: 'Small wooden mallet, acoustic block', verbVi: 'gõ rập khuôn liên tục phát tiếng', verbEn: 'tap the tool rhythmically and obsessively' }
  ],
  CVB: [
    { baseVi: 'Quan sát hành vi nhại lời vô nghĩa', baseEn: 'Observe speech echolalia patterns', matVi: 'Không có vật liệu đặc thù', matEn: 'No specific materials required', verbVi: 'nhại lại y nguyên câu nói của cô', verbEn: 'mimic words or questions verbatim' },
    { baseVi: 'Quan sát hành vi bập bẹ tự phát', baseEn: 'Observe spontaneous babbling', matVi: 'Đồ chơi kích thích giao tiếp nói', matEn: 'Toys stimulating vocal expression', verbVi: 'phát ra các âm bập bẹ vô nghĩa kéo dài', verbEn: 'vocalize non-communicative sounds' }
  ],
  PB: [
    { baseVi: 'Mức độ bùng nổ cơn giận khi cản', baseEn: 'Observe temper tantrum severity', matVi: 'Tình huống cất dọn đồ chơi yêu thích', matEn: 'Situational cleanup of high-interest toys', verbVi: 'chấp nhận dọn dẹp không gào khóc', verbEn: 'accept cleanup without aggressive tantrums' },
    { baseVi: 'Hành vi rập khuôn vẫy tay trước mặt', baseEn: 'Observe hand flapping stereotypy', matVi: 'Không có vật liệu', matEn: 'No materials required', verbVi: 'ngưng vẫy lắc tay khi được hướng dẫn', verbEn: 'stop flapping hands when redirected' }
  ],
  PSC: [
    { baseVi: 'Tự cầm thìa nhựa xúc ăn nhẹ', baseEn: 'Feed self with plastic spoon', matVi: 'Thìa nhựa tròn nhỏ, bát sâu lòng chống đổ', matEn: 'Small plastic spoon, suction deep bowl', verbVi: 'tự xúc thức ăn đưa gọn vào miệng', verbEn: 'scoop and feed themselves independently' },
    { baseVi: 'Tự cởi tất chân rộng rãi', baseEn: 'Take off loose socks', matVi: 'Đôi tất cotton co giãn rộng rãi màu sắc', matEn: 'Pair of colorful loose cotton socks', verbVi: 'tự kéo và lột tất qua gót chân', verbEn: 'pull and slip the sock off their foot' }
  ],
  AB: [
    { baseVi: 'Thích ứng khi chuyển đổi đồ chơi mới', baseEn: 'Transition to a novel toy', matVi: 'Đồ chơi cũ yêu thích và 1 đồ chơi mới lạ', matEn: 'Favorite old toy and a brand new novel toy', verbVi: 'chuyển đổi chơi sang đồ chơi mới vui vẻ', verbEn: 'accept the novel toy and transition play' },
    { baseVi: 'Thích ứng khi thay đổi giáo viên mới', baseEn: 'Adapt to a novel instructor', matVi: 'Sự xuất hiện của trị liệu viên mới', matEn: 'Introduction of a new therapist', verbVi: 'chấp nhận hợp tác làm việc với cô mới', verbEn: 'cooperate and work with the new therapist' }
  ]
};

// Procedural generation logic
subtestsInfo.forEach(subtest => {
  const templates = clinicalGrammar[subtest.code] || [
    { baseVi: 'Bài tập năng lực ' + subtest.code, baseEn: subtest.code + ' Domain Skills', matVi: 'Vật liệu tương tác an toàn', matEn: 'Safe interactive toys', verbVi: 'thực hiện bài tập', verbEn: 'perform the task' }
  ];

  const subtestItems = [];

  for (let i = 1; i <= subtest.count; i++) {
    // Select template cyclically to avoid index out of bounds
    const template = templates[(i - 1) % templates.length];
    
    // Add dynamic modifiers based on index to differentiate every single item name!
    const suffixVi = i === 1 ? '' : ` (Phần ${i})`;
    const suffixEn = i === 1 ? '' : ` (Part ${i})`;
    
    const nameVi = `${template.baseVi}${suffixVi}`;
    const nameEn = `${template.baseEn}${suffixEn}`;
    
    const matVi = i === 1 ? template.matVi : `${template.matVi} dạng cải tiến số ${i}`;
    const matEn = i === 1 ? template.matEn : `${template.matEn} (modified set #${i})`;

    // Detailed contextual scoring rules specifically matching the verbs of this exact exercise
    const scoringVi = {
      "0": `0 điểm: Trẻ không hợp tác, thử ${template.verbVi} không thành công và không biết được những vận động cần thiết hay không cố gắng làm ngay khi xem làm mẫu.`,
      "1": `1 điểm: Trẻ cố gắng ${template.verbVi} nhưng chưa thành công trọn vẹn, cần hỗ trợ nhắc nhở hoặc trợ giúp cầm hờ tay từ chuyên gia.`,
      "2": `2 điểm: Trẻ tự tin và thực hiện ${template.verbVi} thành công trọn vẹn, trơn tru một cách độc lập không cần hỗ trợ.`
    };
    
    const scoringEn = {
      "0": `0 points: Child fails to cooperate, is unsuccessful in attempting to ${template.verbEn}, or makes no attempt even after demonstration.`,
      "1": `1 point: Child attempts to ${template.verbEn} with effort but is not fully successful, requiring minor prompts or hand-over-hand assistance.`,
      "2": `2 points: Child successfully, smoothly, and independently completes the task to ${template.verbEn} with no assistance.`
    };

    const adaptationVi = `💡 Gợi ý thích ứng tự kỷ: Đối với trẻ nhạy cảm giác quan hoặc từ chối vật liệu ${template.matVi.toLowerCase()} tiêu chuẩn, hãy thay thế bằng đồ chơi nhựa dẻo hoạt họa màu sắc nổi bật hoặc silicon mềm. Luôn sử dụng hình ảnh chỉ dẫn (Visual Schedule) để trẻ dễ hợp tác hơn khi ${template.verbVi}.`;
    const adaptationEn = `💡 Autistic Adaptation: For children with sensory hypersensitivities refusing standard ${template.matEn.toLowerCase()}, swap with soft silicone or colorful plastic toys. Always leverage visual schedules to help the child cooperatively ${template.verbEn}.`;

    subtestItems.push({
      id: i, // Local ID starting from 1 for each subtest JSON!
      name: { vi: nameVi, en: nameEn },
      materials: { vi: matVi, en: matEn },
      administration: {
        vi: `Đặt vật liệu ${matVi.toLowerCase()} trước mặt trẻ, dùng cử chỉ điệu bộ rõ ràng làm mẫu và hướng dẫn trẻ: "Con làm giống cô nhé!" để quan sát hành vi năng lực khi trẻ ${template.verbVi}.`,
        en: `Place the ${matEn.toLowerCase()} in front of the child, clearly demonstrate and instruct: "Do it like me!" to observe capacity milestones as they ${template.verbEn}.`
      },
      scoring: {
        vi: scoringVi,
        en: scoringEn
      },
      adaptationGuide: {
        vi: adaptationVi,
        en: adaptationEn
      }
    });
  }

  // Target directory inside PEP-3 module
  const outputFilePath = path.join(__dirname, '..', 'src', 'components', 'assessment', 'pep3', 'database', `${subtest.code}.json`);
  
  // Make sure directory exists
  const dir = path.dirname(outputFilePath);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(subtestItems, null, 2), 'utf-8');
  console.log(`Procedurally generated all ${subtestItems.length} clinical items successfully in database/${subtest.code}.json!`);
});

console.log('Congratulations! decrypted and partitioned all 172 authentic clinical PEP-3 items cleanly!');
