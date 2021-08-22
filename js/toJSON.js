let { readFileSync, readFile, readdir, stat } = require('fs');
const { resolve } = require('path');
let sizeOf = require('image-size');

let describe = {
    "introduce": ["飘廖裙袄裹紧绸缎，显出玲珑剔透的诱人身姿。蓝蝶外衣遮挡白皙肌肤。",
        "周旁蓝色条纹，细看却现暗暗蓝光。晶莹剔透的倒坠耳环垂下，摇曳。",
        "散落肩旁的青丝用血红桔梗花的簪子挽起。斜插入流云似的乌发。",
        "薄施粉黛，秀眉如柳弯。额间轻点朱红，却似娇媚动人。",
        ",纤手将红片含入朱唇，如血。慵懒之意毫不掩饰。举止若幽蓝。",
        "头上插着镂空飞凤金步摇，随着莲步轻移，发出一阵叮咚的响声。衬得别有一番风情美丽可人之姿。",
        "风髻露鬓，淡扫娥眉眼含春，皮肤细润如温玉柔光若腻，樱桃小嘴不点而赤，娇艳若滴，腮边两缕发丝随风轻柔拂面凭添几分诱人的风情。",
        "一身绛紫色长裙，绣着富贵的牡丹，水绿色的丝绸在腰间盈盈一系。",
        "完美的身段立显无疑，携侍女两人缓缓在御花园散步，看到迎面走来的母后。",
        "莞尔一笑，念瑶给母后请安，母后吉祥。",
        "端正到无可挑剔的五官，细致地排出了绝美的轮廓，眸光流转的淡淡阴影下。",
        "是浑然天成的高贵而忧郁的气质，如幽幽谷底的雪白兰花，从骨子散发出疏离寂寞。",
        "仅那么安静地立于眼前，便可叫人心疼地揪痛起来。",
        "大朵牡丹翠绿烟纱碧霞罗，逶迤拖地粉色水仙散花绿叶裙，身披金丝薄烟翠绿纱。",
        "低垂鬓发斜插镶嵌珍珠碧玉步摇，花容月貌出水芙蓉。+5、肩若削成，腰如约素，眉如翠羽，肌如白雪。身穿一袭素锦宫衣。",
        "外披水蓝色轻纱，微风吹过，轻纱飞舞，整个人散发出淡淡灵气。",
        "三千青丝被挽成一个简单的碧落髻，将一支清雅的梅花簪子戴上，只身一人向御花园走去，看着前面缓缓而来的宸妃。",
        "淡绿色的繁花宫装，外面披着一层金色薄纱，宽大的衣摆上锈着紫色的花纹，三千青丝撩了些许简单的挽了一下。",
        "金黄色的云烟衫绣着秀雅的兰花，逶迤拖地黄色古纹双蝶云形千水裙，手挽碧霞罗牡丹薄雾纱。",
        "云髻峨峨，戴着一支镂空兰花珠钗，脸蛋娇媚如月，眼神顾盼生辉，撩人心怀。",
        "碧绿的翠烟衫，散花水雾绿草百褶裙，身披翠水薄烟纱，肩若削成腰若约素，肌若凝脂气若幽兰。",
    ],
    "style": ["古风", "活动海报", "软装面料", "场景背景", "拍摄灵感", "详细页", "台地景观", "海报女装设计用", "女装", "Alan元素纹样", "详情-女装", "饰品详情", "精美素材收集", "欧美女装", "裙子"]
}
let describeJSON
async function toJson() {
    describeJSON = {
        "pins": [],
    };
    let p1 = await new Promise(resolve => {
        readdir('../image', (err, data) => {
            if (err) {
                throw new Errow(err);
            }
            resolve(data);
        })
    })
    let lengthS = describe["style"].length;
    let lengthI = describe["introduce"].length;
    p1.forEach(async element => {
        let data = sizeOf('../image/' + element);
        describeJSON["pins"].push({
            "jpg-id": element,
            "style": describe["style"][Math.floor(Math.random() * lengthS)],
            "introduce": describe["introduce"][Math.floor(Math.random() * lengthI)],
            "width": data.width,
            "height": data.height,
        })
    });
    return describeJSON;
}
return (() => {
    toJson().then(() => {
        console.log('{');
        describeJSON["pins"].forEach((item) => {
            console.log(item);
            console.log(',');
        })
        console.log('}');
        return describeJSON;
    })
})();
