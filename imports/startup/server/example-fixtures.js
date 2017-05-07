import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'
import { Customers } from '/imports/api/customers/customers.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Products } from '/imports/api/products/products.js'
import { Members } from '/imports/api/members/members.js'
import { Visits } from '/imports/api/visits/visits.js'
import { Smaps } from '/imports/api/smaps/smaps.js'
import { SmapColors } from '/imports/api/smaps/smap-colors.js'
import { SmapsDetail } from '/imports/api/smaps/smaps-detail.js'
import { SalesStepsDefs } from '/imports/api/definitions/sales-steps-defs.js'
import { _ } from 'meteor/underscore'
import bcrypt from 'bcrypt'

const accounts = [{
        options: {
            username: '川上哲也',
            email: 'kawakami-tetsuya@metabolics.co.jp',
            password: 'kawakami'
        },
        roles: ['admin'],
        group: '第一営業部',
        tenant: 'tenant-acme',
        rocketchat: { username: 'kawakami-tetsuya', password: bcrypt.hashSync('kawakami', bcrypt.genSaltSync()) },
    },
    {
        options: {
            username: '長嶋茂雄',
            email: 'nagashima-shigeo@metabolics.co.jp',
            password: 'nagashima'
        },
        roles: ['member', 'admin'],
        group: '第一営業部',
        tenant: 'tenant-acme',
        rocketchat: { username: 'nagashima-shigeo', password: bcrypt.hashSync('nagashima', bcrypt.genSaltSync()) },
    },
    {
        options: {
            username: '王貞治',
            email: 'oh-sadaharu@metabolics.co.jp',
            password: 'oh'
        },
        roles: ['member'],
        group: '第一営業部',
        tenant: 'tenant-acme',
        rocketchat: { username: 'oh-sadaharu', password: bcrypt.hashSync('oh', bcrypt.genSaltSync()) },
    }
]

const registerAccounts = (accounts) => {
    accounts.forEach(item => {
        if (!Accounts.findUserByUsername(item.options.username) || !Accounts.findUserByEmail(item.options.email)) {
            const id = Accounts.createUser(item.options)
            if (id) {
                Roles.addUsersToRoles(id, item.roles, item.group)
                Meteor.users.update(id, { $set: { tenant: item.tenant } })
                if (item.rocketchat) Meteor.users.update(id, { $set: { 'services.chat': item.rocketchat } })
            }
        }
    })
}

const context = {
    _tenant: 'tenant-acme',
    _service: 'sales-reinforcement',
    _group: '第一営業部',
    _timestamp: new Date().getTime(),
    financialYear: 2016,
}

const customerTemplate = (context, name) => _.extend(_.clone(context), { name })

const customers = (context, names) => names.map(name => customerTemplate(context, name))

const registerCustomers = (customers) => {
    Customers.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1 })
    Customers.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1 })
    customers.forEach(item => { if (!Customers.findOne(_.omit(item, '_timestamp'))) Customers.insert(item) })
}

const customerId = (name) => Customers.findOne({ name })._id

const deparmentTemplate = (context, name, customerName, grade) => _.extend(_.clone(context), { name, customer: customerId(customerName), grade })

const departments = (context, items) => items.map(item => deparmentTemplate(context, item[0], item[1], item[2]))

const registerDepartments = (departments) => {
    Departments.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1 })
    Departments.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1 })
    Departments.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1, customer: 1 })
    departments.forEach(item => { if (!Departments.findOne(_.omit(item, '_timestamp'))) Departments.insert(item) })
}

const productTemplate = (context, name) => _.extend(_.clone(context), { name })

const products = (context, names) => names.map(name => productTemplate(context, name))

const registerProducts = (products) => {
    Products.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1 })
    Products.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1 })
    products.forEach(item => { if (!Products.findOne(_.omit(item, '_timestamp'))) Products.insert(item) })
}

const salesStepsDefExample = _.extend(_.clone(context), {
    name: 'Default Sales Steps Definition',
    steps: [{
            name: 'アプローチ',
            goals: [{
                name: 'Goal1',
                content: '当社主力製品/ソリューションがもたらすメリットについて先方に理解してもらう',
            }, ],
            methods: [{
                    name: "1",
                    content: `General benefit（業界にある一般的な問題と当社製品/ソリューション）を認識してもらう`,
                },
                {
                    name: "2",
                    content: `当社の強みを認識してもらう`,
                },
                {
                    name: "3",
                    content: `顧客と同業、同種の企業の抱える問題とそのソリューションを認識してもらう`,
                },
            ],
        },
        {
            name: 'ヒアリング',
            goals: [{
                    name: 'Goal2',
                    content: '当社製品/ソリューションに関連する顧客の顕在化している問題を知る',
                },
                {
                    name: 'Goal3',
                    content: 'その顕在化している問題の背景と理由を知る',
                },
                {
                    name: 'Goal4',
                    content: '競合製品/ソリューションに関する顧客の認識について理解する',
                },
                {
                    name: 'Goal5',
                    content: '顧客の本質的なニーズに対する仮説を立て、当社製品/ソリューションがどのような貢献するかを仮説だてる',
                },
            ],
            methods: [{
                    name: "4",
                    content: `先方の抱える問題の確認する。（仮説に基づき質問をしていく）`,
                },
                {
                    name: "5",
                    content: `問題に関する状況の確認（問題の具体的内容とデータ、顧客内の動き、顧客の競合の動き、市場の動き）を確認する`,
                },
                {
                    name: "6",
                    content: `・顧客のQCDSを改善するうえで当社製品が貢献できることを仮説だてる（顧客が表明した問題だけでなく、本質的な問題について焦点を当てる）`,
                },
            ],
        },
        {
            name: 'プレゼンテーション',
            goals: [{
                    name: 'Goal6',
                    content: '顧客の本質的なニーズとそのニーズを満たすことによる効果（メリット）を共有する',
                },
                {
                    name: 'Goal7',
                    content: '顧客の本質的なニーズを如何に当社製品/ソリューションが満たせるかを訴求する',
                },
                {
                    name: 'Goal8',
                    content: '顧客の懸念を引き出す',
                },
                {
                    name: 'Goal9',
                    content: 'メリットデメリットを比較する中で、当社製品/ソリューションの優位性に合意してもらう',
                },
                {
                    name: 'Goal10',
                    content: '提案（見積）を実施する',
                },
                {
                    name: 'Goal11',
                    content: 'ソリューション選択肢を顧客と共同で検討する',
                },
            ],
            methods: [{
                    name: "7",
                    content: `カギとなる質問（以下の3種）を通して、問題を放置した場合もしくは解決した場合の影響を顧客に考えてもらい、ニーズに転換する。さらに、本質的なニーズを満たした場合の影響を考えてもらい、本質的なニーズに気づいてもらう。
・予測する（影響をできるだけ多く、具体的に予測してもらう。自分も仮説だてておく）
・算定する（影響を数値化し、具体的な大きさを感じてもらう。自分も仮説だてておく）
・類比する（他社での類似した事例とその影響を示し考えてもらう）`,
                },
                {
                    name: "8",
                    content: `懸念を引き出すことを忘れずに`,
                },
                {
                    name: "9",
                    content: `本質的なニーズを満たすソリューションとその選択肢を提示する。`,
                },
                {
                    name: "10",
                    content: `各選択肢のメリットデメリットを合意する。`,
                },
                {
                    name: "11",
                    content: `顧客の懸念を引き出しておくこと。（特にキーパーソン）`,
                },
                {
                    name: "12",
                    content: `顧客の懸念に重みづけを整理しておくこと。`,
                },
            ],
        },
        {
            name: 'クロージング',
            goals: [{
                    name: 'Goal12',
                    content: '提案後の顧客の懸念を洗い出し解消すること',
                },
                {
                    name: 'Goal13',
                    content: '受注に向けての具体的な次のアクションを合意すること',
                },
            ],
            methods: [{
                    name: "13",
                    content: `顧客の懸念が誤解なのか本質的な懸念なのかを理解すること。`,
                },
                {
                    name: "14",
                    content: `後者の場合は、提案しているソリューションのデメリットを再度示しながらもそれを上回るメリットを改めて理解してもらう。`,
                },
                {
                    name: "15",
                    content: `上記段階で認められた新たな懸念があれば、それに対する対応策を考え講じる。（例えばソリューションの内容を変える、価格を変える、等々）`,
                },
                {
                    name: "16",
                    content: `受注を確実にするために、顧客に取って頂く行動を期限を合意すること。（例えば、顧客上層部の稟議書提出・・・）`,
                },
            ],
        },
        {
            name: '受注',
            goals: [{
                name: 'Goal14',
                content: '受注、失注要因を明らかにすること',
            }, ],
            methods: [{
                name: "17",
                content: `受失注の原因を以下の要因ごとにあきらかにすること
①顧客の本質的なニーズは何だったのか？
②顧客の本質的なニーズを気づかせるうえで有効だったアプローチは？
③顧客の本質的なニーズに当社製品がどのように役立つのか
④競合他社はどこで、その製品は何か？
⑤競合、その製品に勝った最大要因は何か？`,
            }, ],
        },
        {
            name: 'アフターサービス',
            goals: [{
                name: 'Goal15',
                content: '受注後の以下の状況を把握すること',
            }, ],
            methods: [{
                    name: "18",
                    content: `受注した商品がどのような効果を顧客に提供しているかを確認すること`,
                },
                {
                    name: "19",
                    content: `クレームおよびその予兆、さらには、顧客サービスを改善するために必要な事柄を迅速に把握すること`,
                },
            ],
        },
    ]
})

const registerSalesStepsDef = def => {
    if (!def) return
    if (!SalesStepsDefs.findOne({ name: def.name })) SalesStepsDefs.insert(def)
}

const memberContext = _.extend(_.clone(context), {
    workingHoursPerDay: 9,
    workingDaysPerMonth: 22,
    activityTypes: { 訪問: 35, 移動: 30, 企画書作成: 25, 社内会議ほか: 10 },
    hoursPerVisiting: 0.5,
    currentCustomerPercentile: 80,
    mostSignificantCustomerPercentile: 60,
    significantCustomerPercentile: 30,
    steps: {
        アプローチ: { conversionRatio: 100, standardVisitFrequency: 1, },
        ヒアリング: { conversionRatio: 100, standardVisitFrequency: 2, },
        プレゼンテーション: { conversionRatio: 50, standardVisitFrequency: 4, },
        クロージング: { conversionRatio: 25, standardVisitFrequency: 2 },
        受注: { conversionRatio: 17, standardVisitFrequency: 0, },
    },
    salesGoalOfPropositionSalesPerMonth: 4800000,
    grossMarginGoalOfPropositionSalesPerMonth: 1440000,
})

const departmentId = (customerName, departmentName) => {
    const customerId = Customers.findOne(_.extend(_.omit(_.clone(context), '_timestamp'), { name: customerName }))._id
    return Departments.findOne(_.extend(_.omit(_.clone(context), '_timestamp'), { customer: customerId, name: departmentName }))._id
}

const inChargeOf = (customers) => customers ?
    customers.map(c => departmentId(c[0], c[1])) : []

const salesStepsDef = () => SalesStepsDefs.findOne({ name: 'Default Sales Steps Definition' })._id

const memberTemplate = (context, spec) => {
    return _.extend(_.clone(context), {
        account: accountId(spec.email),
        inChargeOf: inChargeOf(spec.inChargeOf),
        salesStepsDef: salesStepsDef(),
    })
}

const accountId = (email) => Accounts.findUserByEmail(email)._id

const members = (context, specs) => specs.map(spec => {
    return memberTemplate(context, spec)
})

const registerMembers = (members) => {
    Members.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1 })
    Members.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1 })
    Members.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1, account: 1 })
    members.forEach(item => {
        if (!Members.findOne(_.omit(item, '_timestamp'))) Members.insert(item)
    })
}

const indexVisits = () => {
    Visits.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1 })
    Visits.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1 })
    Visits.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1, member: 1 })
    Visits.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1, member: 1, plannedDate: 1 })
}

const indexSmaps = () => {
    Smaps.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1 })
    Smaps.rawCollection().createIndex({ _tenant: 1, _service: 1, _group: 1, financialYear: 1 })
    SmapsDetail.rawCollection().createIndex({ customerId: 1, productId: 1 })
    SmapColors.rawCollection().createIndex({ customerId: 1, productId: 1 })
}

export default () => {
    registerAccounts(accounts)
    registerCustomers(customers(context, ['顧客A社', '顧客B社', '顧客C社']))
    registerDepartments(departments(context, [
        ['本社', '顧客A社', '最重要', ],
        ['山梨工場', '顧客A社', '最重要', ],
        ['福井支社', '顧客A社', '重要', ],
    ]))
    registerProducts(products(context, ['製品A', '製品B', '製品C']))
    registerSalesStepsDef(salesStepsDefExample)
    registerMembers(members(memberContext, [
        { email: 'kawakami-tetsuya@metabolics.co.jp', customers: [] },
        {
            email: 'nagashima-shigeo@metabolics.co.jp',
            inChargeOf: [
                ['顧客A社', '本社']
            ],
        },
        {
            email: 'oh-sadaharu@metabolics.co.jp',
            inChargeOf: [
                ['顧客A社', '山梨工場'],
                ['顧客A社', '福井支社']
            ],
        },
    ]))
    indexVisits()
    indexSmaps()
}