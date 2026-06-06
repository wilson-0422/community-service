import db from './config/database';
import { initDatabase } from './config/database';
import * as userService from './services/userService';
import * as activityService from './services/activityService';
import * as mealService from './services/mealService';
import * as exchangeService from './services/exchangeService';
import * as volunteerService from './services/volunteerService';
import * as complaintService from './services/complaintService';

initDatabase();

const userCount = (db.prepare('SELECT COUNT(*) as count FROM users').get() as any).count;
if (userCount > 0) {
  console.log('种子数据已存在，跳过初始化');
  process.exit(0);
}

const admin = userService.createUser({
  username: 'admin',
  password: 'admin123',
  real_name: '社区管理员',
  role: 'admin',
  phone: '13800000001',
  address: '阳光社区服务中心',
});

const residents = [
  userService.createUser({ username: 'zhangwei', password: '123456', real_name: '张伟', phone: '13800000002', address: '阳光小区3号楼201' }),
  userService.createUser({ username: 'lina', password: '123456', real_name: '李娜', phone: '13800000003', address: '阳光小区5号楼302' }),
  userService.createUser({ username: 'wangfang', password: '123456', real_name: '王芳', phone: '13800000004', address: '阳光小区2号楼101' }),
  userService.createUser({ username: 'zhaoming', password: '123456', real_name: '赵明', phone: '13800000005', address: '阳光小区7号楼501' }),
  userService.createUser({ username: 'liuyang', password: '123456', real_name: '刘洋', phone: '13800000006', address: '阳光小区1号楼203' }),
  userService.createUser({ username: 'chenxia', password: '123456', real_name: '陈霞', phone: '13800000007', address: '阳光小区4号楼102' }),
  userService.createUser({ username: 'sunqiang', password: '123456', real_name: '孙强', phone: '13800000008', address: '阳光小区6号楼405' }),
  userService.createUser({ username: 'zhouli', password: '123456', real_name: '周丽', phone: '13800000009', address: '阳光小区8号楼301' }),
];

const activities = [
  activityService.create({ title: '社区春季运动会', description: '一年一度的社区运动会，包含跑步、跳绳、拔河等项目', location: '社区文化广场', start_time: '2025-04-15 08:00', end_time: '2025-04-15 17:00', max_participants: 100, created_by: admin.id }),
  activityService.create({ title: '亲子手工制作活动', description: '家长和孩子一起制作手工艺品，增进亲子关系', location: '社区活动中心2楼', start_time: '2025-04-20 09:00', end_time: '2025-04-20 12:00', max_participants: 30, created_by: admin.id }),
  activityService.create({ title: '健康知识讲座', description: '邀请市医院专家讲解老年人常见疾病预防知识', location: '社区会议室', start_time: '2025-04-25 14:00', end_time: '2025-04-25 16:00', max_participants: 50, created_by: admin.id }),
  activityService.create({ title: '社区文艺汇演', description: '居民自编自演的歌舞、小品等文艺节目', location: '社区文化广场', start_time: '2025-05-01 19:00', end_time: '2025-05-01 21:00', max_participants: 200, created_by: admin.id }),
  activityService.create({ title: '环保清洁志愿活动', description: '组织居民清理社区公共区域，美化居住环境', location: '阳光小区各楼栋', start_time: '2025-05-10 07:00', end_time: '2025-05-10 11:00', max_participants: 40, created_by: admin.id }),
  activityService.create({ title: '老年人智能手机培训', description: '教老年人使用智能手机进行视频通话、网上购物等', location: '社区活动中心1楼', start_time: '2025-05-15 09:00', end_time: '2025-05-15 11:30', max_participants: 20, created_by: admin.id }),
];

activityService.register(activities[0].id, residents[0].id);
activityService.register(activities[0].id, residents[1].id);
activityService.register(activities[0].id, residents[2].id);
activityService.register(activities[1].id, residents[3].id);
activityService.register(activities[1].id, residents[4].id);
activityService.register(activities[2].id, residents[5].id);
activityService.register(activities[3].id, residents[0].id);
activityService.register(activities[3].id, residents[1].id);
activityService.register(activities[3].id, residents[2].id);
activityService.register(activities[3].id, residents[3].id);
activityService.register(activities[4].id, residents[6].id);
activityService.register(activities[5].id, residents[7].id);

mealService.create({ user_id: residents[2].id, meal_date: '2025-04-15', meal_type: 'lunch', menu_item: '红烧肉+青菜+米饭' });
mealService.create({ user_id: residents[2].id, meal_date: '2025-04-15', meal_type: 'dinner', menu_item: '鸡汤面+小菜' });
mealService.create({ user_id: residents[5].id, meal_date: '2025-04-16', meal_type: 'breakfast', menu_item: '小米粥+鸡蛋+馒头' });
mealService.create({ user_id: residents[5].id, meal_date: '2025-04-16', meal_type: 'lunch', menu_item: '清蒸鱼+西红柿炒蛋+米饭' });
mealService.create({ user_id: residents[7].id, meal_date: '2025-04-16', meal_type: 'lunch', menu_item: '宫保鸡丁+炒时蔬+米饭' });
mealService.create({ user_id: residents[2].id, meal_date: '2025-04-17', meal_type: 'lunch', menu_item: '排骨汤+土豆丝+米饭' });
mealService.create({ user_id: residents[5].id, meal_date: '2025-04-17', meal_type: 'dinner', menu_item: '饺子+凉拌黄瓜' });

const exchangeItems = [
  exchangeService.create({ title: '九成新儿童自行车', description: '孩子长大了用不上了，九成新，适合3-6岁儿童', category: '儿童用品', condition_level: 'good', owner_id: residents[0].id, contact_info: '13800000002' }),
  exchangeService.create({ title: '家用跑步机', description: '搬家后用不上了，功能完好，可上门自提', category: '运动器材', condition_level: 'good', owner_id: residents[1].id, contact_info: '13800000003' }),
  exchangeService.create({ title: '全套考研书籍', description: '2024年考研全套资料，含政治英语数学', category: '图书教材', condition_level: 'fair', owner_id: residents[3].id, contact_info: '13800000005' }),
  exchangeService.create({ title: '婴儿推车', description: '好孩子品牌，使用半年，成色很新', category: '儿童用品', condition_level: 'new', owner_id: residents[4].id, contact_info: '13800000006' }),
  exchangeService.create({ title: '电饭煲', description: '美的智能电饭煲，5L容量，使用一年', category: '家用电器', condition_level: 'good', owner_id: residents[6].id, contact_info: '13800000008' }),
  exchangeService.create({ title: '书法字帖套装', description: '含毛笔、墨汁、宣纸、字帖，适合初学者', category: '文化用品', condition_level: 'new', owner_id: residents[7].id, contact_info: '13800000009' }),
];

const shifts = [
  volunteerService.createShift({ title: '社区门岗值守', description: '协助物业进行小区门口人员登记和体温测量', location: '阳光小区东门', shift_date: '2025-04-15', start_time: '08:00', end_time: '12:00', max_volunteers: 3 }),
  volunteerService.createShift({ title: '助老送餐服务', description: '为行动不便的老年人送餐上门', location: '社区服务中心', shift_date: '2025-04-15', start_time: '10:30', end_time: '13:00', max_volunteers: 5 }),
  volunteerService.createShift({ title: '社区图书室值班', description: '负责图书室日常借还书登记和整理', location: '社区图书室', shift_date: '2025-04-16', start_time: '09:00', end_time: '17:00', max_volunteers: 2 }),
  volunteerService.createShift({ title: '垃圾分类指导', description: '指导居民正确分类投放垃圾', location: '阳光小区各垃圾投放点', shift_date: '2025-04-17', start_time: '07:00', end_time: '09:00', max_volunteers: 4 }),
  volunteerService.createShift({ title: '社区巡逻', description: '协助社区进行安全巡逻，发现隐患及时上报', location: '阳光小区全域', shift_date: '2025-04-18', start_time: '19:00', end_time: '22:00', max_volunteers: 3 }),
];

volunteerService.signup(shifts[0].id, residents[0].id);
volunteerService.signup(shifts[0].id, residents[1].id);
volunteerService.signup(shifts[1].id, residents[5].id);
volunteerService.signup(shifts[1].id, residents[7].id);
volunteerService.signup(shifts[2].id, residents[3].id);
volunteerService.signup(shifts[3].id, residents[6].id);
volunteerService.signup(shifts[4].id, residents[0].id);

const complaints = [
  complaintService.create({ title: '3号楼电梯频繁故障', content: '3号楼电梯近一个月内已发生5次故障，严重影响居民出行，特别是老年人和行动不便的居民。希望物业尽快安排维修或更换。', category: '基础设施', priority: 'high', submitter_id: residents[0].id }),
  complaintService.create({ title: '小区绿化带被占用停车', content: '近期有业主将车辆停放在绿化带上，导致草坪被碾压破坏，影响小区整体环境美观。', category: '环境卫生', priority: 'normal', submitter_id: residents[1].id }),
  complaintService.create({ title: '夜间施工噪音扰民', content: '隔壁工地连续多日在晚上10点后仍在施工，噪音严重影响周边居民休息。', category: '噪音污染', priority: 'urgent', submitter_id: residents[3].id }),
  complaintService.create({ title: '社区健身器材损坏', content: '小区中心广场的跑步机和扭腰器已损坏超过两周，至今无人维修，存在安全隐患。', category: '基础设施', priority: 'normal', submitter_id: residents[4].id }),
  complaintService.create({ title: '楼道照明灯不亮', content: '5号楼3单元4楼至6楼的楼道灯已坏了一周，晚上出行非常不便，存在安全风险。', category: '基础设施', priority: 'high', submitter_id: residents[6].id }),
  complaintService.create({ title: '宠物犬未牵绳', content: '小区内经常有居民遛狗不牵绳，大型犬对老人和儿童造成惊吓，存在安全隐患。', category: '安全管理', priority: 'normal', submitter_id: residents[7].id }),
];

complaintService.updateStatus(complaints[0].id, 'processing', admin.id);
complaintService.updateStatus(complaints[2].id, 'processing', admin.id);
complaintService.reply(complaints[1].id, '已安排物业巡逻人员加强巡查，对违规停车行为进行劝导和处罚。同时将在绿化带周边增设隔离桩。', admin.id);

console.log('种子数据初始化完成！');
