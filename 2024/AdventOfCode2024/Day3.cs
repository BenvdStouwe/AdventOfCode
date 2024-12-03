namespace AdventOfCode2024;

public class Day3
{
    private const string TestInput = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

    [Theory]
    [InlineData(TestInput, 161)]
    [InlineData(RealInput, 174960292)]
    public void Part1(string input, int expectedResult)
    {
        var answer = 0;

        char previous = 'h';
        var number = "";
        var left = 0;
        foreach (var ch in input) 
        {
            switch (ch)
            {
                case 'm':
                    previous = ch;
                    break;
                case 'u' when previous is 'm':
                    previous = ch;
                    break;
                case 'l' when previous is 'u':
                    previous = ch;
                    break;
                case '(' when previous is 'l':
                    previous = ch;
                    break;
                case char c when previous is '(' && char.IsDigit(c):
                    number += c;
                    break;
                case ',' when number is not "":
                    left = int.Parse(number);
                    number = "";
                    break;
                case ')' when number is not "" && left is not 0:
                    answer += left * int.Parse(number);
                    Reset();
                    break;
                default:
                    Reset();
                    break;
            }
        }

        Assert.Equal(expectedResult, answer);

        void Reset()
        {
            previous = 'h';
            number = "";
            left = 0;
        }
    }


    private const string TestInput2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

    [Theory]
    [InlineData(TestInput2, 48)]
    [InlineData(RealInput, 56275602)]
    public void Part2(string input, int expectedResult)
    {
        var answer = 0;

        var enabled = true;
        char previous = ' ';
        var number = "";
        var left = 0;
        var switcher = ' ';
        var switcherAction = false;
        foreach (var ch in input) 
        {
            switch (ch)
            {
                case 'd':
                    switcher = ch;
                    break;
                case 'o' when switcher is 'd':
                    switcher = ch;
                    break;
                case 'n' when switcher is 'o':
                    switcher = ch;
                    break;
                case '\'' when switcher is 'n':
                    switcher = ch;
                    break;
                case 't' when switcher is '\'':
                    switcher = ch;
                    break;
                case '(' when switcher is 't' or 'o':
                    switcherAction = switcher is 'o';
                    switcher = ch;
                    break;
                case ')' when switcher is '(':
                    enabled = switcherAction;
                    Reset();
                    break;
                case 'm' when enabled:
                    previous = ch;
                    break;
                case 'u' when previous is 'm':
                    previous = ch;
                    break;
                case 'l' when previous is 'u':
                    previous = ch;
                    break;
                case '(' when previous is 'l':
                    previous = ch;
                    break;
                case char c when previous is '(' && char.IsDigit(c):
                    number += c;
                    break;
                case ',' when number != "":
                    left = int.Parse(number);
                    number = "";
                    break;
                case ')' when enabled && number is not "" && left is not 0:
                    answer += left * int.Parse(number);
                    Reset();
                    break;
                default:
                    Reset();
                    break;
            }
        }

        Assert.Equal(expectedResult, answer);

        void Reset()
        {
            previous = ' ';
            number = "";
            left = 0;
            switcher = ' ';
        }
    }

    private const string RealInput = @"
[#from())when()/}+%mul(982,733)mul(700,428)}}don't(){:,$+mul(395,45)[; what()!mul(328,373)?!, <-)mul(139,254)^>#)*,[,&when()mul(719,688)-@,from()-@mul(616,640)from()!~{[' mul(666,309)(mul(889,261){select();why())<(/mul(364,750)>:+(:/mul(911,969)mul(360,631)~select() )$>mul(692,527)^mul(823,512)!]{where():&;,how()don't()'?,*where()<[>!mul(345,427))~ do()((how()@mul(394,662)[mul(903,277)why()~from()mul(249,126)>?/-what()'when()from()[who()mul(823,356)$mul(257,129),%*what()+]when()(mul(571,713)+why()]#([mul(230,759)'</>%^}$]mul(978,804)%>~!{-&don't() &'how() why()why(379,123)mul(816,166)}from(576,921) ?/when()?when()mul(946,526)/*mul(321,352)> where()'^ select(925,337)>[mul(233,433)<!}%;%:^>^mul(247,132)select(){[ ]!~ mul(104,931)why()&-+)~:<from()mul(587,547)<(where()where()where()how()mul(267,595)who()mul(834,996)where()select()@[mul(172,45)#+why()how()how()!#]~mul(3,396)why()~/mul(406,706){mul(209,557)?where() ?mul(716,930)what();&mul(92,580)'from()*[#!)where()when()mul(538,570)where()<when()/+-what()]mul(846,458)where()$why(){mul(18,615)when()#};:select()!*^mul(666,191):#from()when()from(),!^mul(837,567) #from()/when(612,5){/:mul(456,298)mul(570,670)mul(8,433)select()~}why()[^mul(358,86)who()/#mul(330,764)(how(905,838)from()#mul(683,182)]-!%:<[(why(257,862)mul(16,909);&who()*@where()when()mul(53,161)'where()?] [!mul(526,714)['}'@when()mul(101,388)?:how()select(762,661)where()%-<mul(862,638)what()select(),~^(mul(106,417){what()select()+from()}mul(946,829)^@mul(924,557),from()!when()mul(216,185)%mul(639,534) )!#<:]from()mul(710,22))>}#,}-$>&mul(412,598)*who()where();@why()do()mul(814,674)%where(){;~mul(654,224)/(what()][^how(190,339)#mul(690,95)&}what()*[mul(821,149) :-who()from()~mul(279,247);)mul(66,274)who()$)why()@where(395,477)~<mul(550,43)]^(why()>:/~mul(442,748)*when()from()'who()}]^~%mul(130,259)}why()<})how(){^mul(768,298)>{-+when(366,794):-mul(489,845)*mul(442,721)-$[ {)mul(283,227)@how()[where()>mul(862,708)'who()?*!where(){mul(182,377)#^mul-[;select()^-!mul(472,672)'select()mul(117,275))$where()$('select(),$(mul(409,378)where()where()?'mul(448,267)]!,:&;what()%>what(265,341)mul(916,448)~when()/!/ ;how()mul(849,877)what()<mul(444,734))>*?do()mul(851,406)~/%~mul(480,848)from(607,219)who()@~mul(803,80)don't(){*how()%{!where()select()mul(482,344),]/mul(702,892)how()@)']mul(552,653))&<^,^+#mul(13,654) /?:mul&from()what()mul(247,264)<$'{*^how();;mul(453,796)&+select(338,67)mul(201,343)>select()) /who()mul(360,411)what()why()@mul(657,810):/}&$:+-<mul(712,186)$'<~)when()!mul(241,637)where(),,'!<%mul(829,983)mul(388,384)@mul(47,882)>^what()do()what()<mul(796,344);'(what()+mul(460,350)how():,!how()mul(38,82)###}]&&from()select()mul(402,61)^]]-]mul(159,67))@who()! (] mul(618,693)~from()why()-*mul(5,516);how()&##@[^ +mul(632,327):where()when()($mul~,-mul(363,380)'!{how()'~when(),'how()mul(696,848)where()>'select()where()mul(129,10)$#where()!]select(),}how()~mul(545,776)@%*how()who(){mul(25,979)mul(448,493)what()'^>do()why()# & mul(56,384)
?why()mul(56,627):-?+-what()from()(}mul(55,437)(*%&$do()<mul(831,13)$?where()~[%>#{$don't()&mul(246,928)&%)#%,'#select()how()mul(943,775)*,!mul*/'(who()where())mul(719,941)?, >-^/mul(778,355)%what()mul(920,978)@when()do()/how()'when()-mul(671,550)!what()>[!mul(644,99)'who(308,220)'$({mul(919,375select()don't()'what()mul(714,919)<;#-{!{mul(541,507)(*what()%why()mul(692,759)$mul(716,287)!]>^mul(665,820);who()mul(489,645)@~(why()?$^%select()mul(815,720)@mul(143,726)-(!-what()where(){#mul(320,590)!:)+{@{*+]mul(140,659)mul(935,172)mul(329,759))'}~~'[when()+mul(771,773)'!*}*select()<}-mul(205,139)when()'$*/{mul(666,493)mul(54,372)$,<when()[^*mul(150,695)>#$what()@{:}[mul(824,679)from()}mul(918,54)@;>@!mul(227,267)~];what()mul(327,164)%,}mul(154,571)]^mul(97,247))mul(219,849)select()mul(279,307)how(),*?*&<mul(252,873):mul(794,964)?mul(970,980)what()(mul(660,809)'how()-select()when()#)^mul(231,259)+;,,*what()@why():mul(362,200)what()%+<when()how()select()mul(259,30){mul(544,795)>$#?)!}~#+mul(214,556)?~(mul(947,774)($^(>#-/@'mul(680,458)>*what(378,770)~- '?where()mul(757,805)+[?#select():-<mul(995,465)(){)%mul(983,88)#-,~-{what()&<}mul(916,941),+/who()?&mul(810,850);:what()&who()*mul(280,570)who() mul(374]mul(902,355)where() <mul(330,330)(}$%~<where()?$(mul(732,634)){@%who()from()why(147,156)~mul(651,307%@@mul(365,883),mul(740,308))]&mul(28,478)@'^*; mul(884,943)/,+{;don't()what()+what()mul(180,509)&<'+/don't()how())+$?!/how()&,mul(323,697)?!who()/>mul(607,982)(?*{!-$>,mul(934,196)when()how()where()%]^^&%mul(879,438)where()}?what()<mul(791,603)>&*why()why()mul(563,458) don't()select(823,614)!*')where()where(),mul(621,647)~{$ ??why()mul(258{ ]who()>-]don't()/!&mul(783,70)~select(),mul(601,782)where()@mul(132,385)[mul(639,263{ ?why():}{&mul(424,281)-*>+who()!how()where(729,42)mul(579,859){+why()mul(826,812)&($#mul(28,383)]-from()&mul(274,484)^select()mul(662,327)<when(360,173),from()don't()mul(616,457))&#}#?-mul(451,71))!why(281,200),%{ mul(115,724+{<},-:$how()%/mul(594,997)::+{mul(303,552)>+when()from()#[]who()mul(481,190)^^:>+mul(656,796)?[,]]?mul(195,147)select()]>mul(405,286)?%}#-where()$why(753,135)^mul(207,366)!why()when(245,871)*#mul(834,202):]how(511,578)who() @+mul(860,487)mul(766,862)why()^$from()#%$]mul(458,470)why()mul(852,979)mul(983,451)select(505,117)!:don't()]$]#[,<}mul(822select() ]<!:mul(65,670)mul(580,896)>! ;%,mul(384,20)>what()*;-+mul(309,125)'from()how()who()-when()select()when() ?mul(326,51)when()@:mul(493,525)~select()/?^&mul(235,832'@when()}mul(657,540)@>,from()!mul(959,593)<mul(123,828) mul(529,936)<who(666,423)why()~/mul(438,536)select()*!>don't()>/how()~]&:{mul*;>}~mul(305,904)mul(906,489)&mul(315,569)([from()~mul(565,343)@<^select()mul(48,333)mul(787,786)$ #(}<where()where()>mul(953,78):/?why(230,166)*who():(~what()mul(252,932)[when()^*:when():mul(200'+'~}what()mul(829,705)from(590,812)>mul(130,990where()(from()^mul(281,313) @mul(809,672)*why()  what(),(+mul(478,222)^&who()?*!mul(576,270)
,^<select()!/how()who())mul(647,213)#mul(715,605)])!'where()from()#<>how()mul(48,786)?^~<(<*from()don't()what()}mul(392,859))(why())select()mul(277,939)%mul(504,200)+who()from()why()/:~ $mul(187,846)who(907,944)mul(688,788+>mul(530,75)>when()what(),!who(761,680){;,#mul}~(/why()mul(891,102)@/^mul(803,887)'when()*from()/%%>&mul(89,939) <what()(%]@ how()when(187,254)mul(710,53)select()/from()mul(270,677):@ >who()when(){mulwhat()where()from(462,595)%mul(502,530)^]?'-mul(250,294)mul(605,766)(&>[mul(603,805)mul(137,182)mul(423,943)when(901,398) )mul(288,661)mul(625,873)-who()what()why()+#>}mul(241,604):(]~>&:mul(467,489)/&}[?>mul(53,380)'&[when()&~$?mul(302,961)from()*when()}select()mul(882,764) ,?%what()mul(204,978)when())who()mul(353,772)what();+>-mul(770,681);select()@mul(769,770)^select()when()mul(111,749)$&+?,?mul(633,686)]what()-why()mul(665how()[what()>mul(293,891)mul(442,313)!+where()$*mul(943,306;}%%select() mul(725,505)$why()['select()mul(922,245)~mul(800,759),mul(151,956)!mul mul(93,438)mul(387,185)[who(477,260)}>}[don't()![what()?]what()!(how()mul(554,415)](#mul(383,957)mul(454,823{:<;mul(385,442)<<-where()]select())mul(596,203)mul(402,933)[ &+mul(73,911)mul(308,100)()<%/]how()! $mul(114,356)how()$who():{$~when()mul(932,798)':!%<,@where()&mul(432,183)]when(489,492):,+how()<?}mul(532,202)/why()from()<mul(713,848) how(),?]^&>who()mul(452,30)mul(605,245)how()why()@,who()where(941,116)/?mul(71[where()^&when()mul(241,487)mul(668,60)mul(117,107)}[mul(115,580)~why()}:$+>{:mul(158,892)select()?^)%^where()*who()mul(959,22))##~#?}mul(149,724)'when()from())??select()' mul(303,721)where())*mul(558,172)mul(263,92)mul(238,242)'!why()where(229,547),do()why()who(),~'+mul(942,451)why()what()mul(734,792)select(); what()+,;}'mul(474,602)+mul(22,992)?what()?when()mul(13,956)'!}#;what()mul(943,628)*'mul(766,222)~(how()!mul(415,153)+^when()select()#what()how()(mul(954,996)~mul(677,121)/why()<when()'}mul(392,160)&{why()(;who()@~!}mul(369,43){why()mul(279,718)-who()+]?-:-mul(966,999)('when()select()<(mul(778,211)when(),mul(582,577)/(how()who(){when(){;mul(729,837)(why();don't()+@@]^mul(808,495):<{%where()]mul(990,481)why()from()how()^>~who()-~mul(585,596)$':where():<mul(767,236){</(mul(274,996)-{:!- from())mul(998,833)!<who()}@~#*#}mul(504,999)mul(903,288)@#mul(650,824)^ &<,(~[mul(576,902)?why())!:}who()how()mul(916,608)who())<;(~?mul(927,409)who(),;mul(337,541)- mul(531,183)mul(379,214) ^mul(572,663){<{mul(317,663)*where()mul(99,960)'from()don't()')[why()^+mul(791,694)!-<~> who()%select()mul(615,102)[when();where()why()mul(514,759)where()]mul(655,965)[mul(159,259)/where()why():{mul(575,955)@%what()<,@select()!mul(483,798)>mul(739,11)where()from()}^#mul(893,732)mul(94,603)#who(21,133)why()^?'#what()mul(505,569);%mul(179/mul(438,58)$#:who(){{%when()!)mul(23,492from(){[what()!?)(;(mul(635,75)*@#how()*@when();}who()#!/usr/bin/perlwhy()/(#*what()mulwhat()from()select()*;%mul(975,209)when():how()+{mul(892,132)
mul(852,368)%:mul(114,988)@}-from()->+mul{how()^;$}&:-mul(985,558)how()%select()){%(:; mul(288,312){;where()'how()mul(336,716)/{(,;mul(409,530)why()$where()how()';where()%]mul(701*mul(961,243)>?$}[what(195,143)^mul(61,76)>>select()~when()why()$;mul(743,240)+~from()what()/{&when()why()!mul(347,105 what()mul(617,589) /@#%;?from()^*mul(330,309)[';?,&[%mul(370,215)!~[#when()>who()&mul(547,103)~when()&mul(965,253)from()*$-+*mul(589,893)mul(324,608select()[why()&-~>[how()why()?don't()#;@how(429,486)mul(184,79)#@^':}$]-mul(693,137)where()[who(696,367)mul(500,973)where()~^mul(706,585)}!%~mul(388,864)/why() mul(64,438)&!-who()%*$from()from()&mul(715,860)why()where()]%!:when()?^mul(60,506)*!-why()}^mul(364,578)mul(213,857)#when()<how()where()^why()@<mul(60,382)when()[}?mul(68,30)-~>mul(944,88)what()mul(929,686)>>mul(521;how()/~,)^don't():{~~ >]'mul(181,275)?how()%/$}{where())mul(849,549)}what()^ -mul(377,304)(select()who()<?mul(73,844)~%}@^!{don't()from()?why(451,187)what()mul(967,674)#select()+,}/---mul(643,786)(}%mul(517,65)where()[-[:}}>mul(144,3)---~*when()/}mul{/;where() mul(820,531)'who()who()+'what()mul(447,768)?&;;/;what()mul(242,291)<]select()why()mul(103,796)from()<(who()how()mul(131,237) mul(317/mul(265,348)])!;mul(635,160)why()#/)~who()$mul(779,125)from()mul(584,45),!from()&where()@?mul(225,920)^'select()+~mul(545,219/~~-+*;&'mul(758,66)]~(mul(190,720)mul(721,95)~!/]]@>who()from()mul(835,210)mul(854,651),( , where()+<what()*mul(95&{*&^[;/mul(229,417)-#?when()when()select()mul(184,763)[where()<+mul(711,715)?'from()^[}){@mul(160,47),&what()>@[mul(420,440)['}>}-mul(78,899)where()@%from()^mul(969,326)from(273,316)(what()]don't()mul(926,149)select(557,597))*,#who()mul(500,899)mul(784^:when()mul(246,886)/:why()mul(566,809)#{^@how()what(14,517)why()how(717,279)'mul(618,578)~mul(377,565);[^@+how();mul(971why()what()>#$$why()mul(340,80)%do()<:^?<$;mul(270,501)+$mul(123,33)who()#]mul(210,880)##;~@ ,when(321,532)how()-mul(774,259)mul(134,769)mul(530,259)when()how(),-*mul(824 [> from()?'how()$?mul(659,212)/mul(349,292)([}who()>@#@who()mul(301,677)~}#<how()how()what()&don't(){&~;-mul(941,587)?>&+how(33,836)mul(756,809)@)who()what()^&mul(340,355)why()*mul(895,908)#$,!]?~mul(947,581) when()mul(812,612))~:,!>mul(784,307)>%select()&select()mul(465,327)when();>>/where()mul(198,33)%%what()select()?^,@how()mul(569,675)~;+where()'>@how()what()mul(405,231){?mul(773,340)why()what(431,691);from()%~@([mul(775,613+[);!mul(575,541)why()!@mul(765,267)?where(462,577)%+),&%'mul})'mul(206,338))+don't()<<{mul(577,346)mul(364,159);:*~@:+!;mul(572,192)mul(979,469)why();>mul(245,149)where()+mul(379,423)!:)mul(929,482)#^don't()[,%mul(165,905) what()where()how(){@mul(409,95)select()>#who()#mul(765,311)<?+when(145,550)<mul(520,19)^](*[{mul(694,220)how()(]from(569,746)who()select()%what()mul(817,126(}>+where()when()mul(342,342);where()$(%;/mul(950,988),from()%~/mul(276,267)(>[)+[-when();%mul(339,489)/?when()-~%>what()from(572,199)mul(675,192)how()mul(809,602)[~>*don't()*]#}mul(485,278)}]mul(625,974)why(510,506)from()^<why()mul(391,538)from()from()mul(592,401)],who()who(397,850)from()mul(356,786)#when()select()[what()  mul(257,900@{select(66,790)mul(814,505)-what()where()!mul(220,248)
mul(279,356)$mul(339,563)why():how(91,512))why(),from()mul(377,571)/where()mul(85,545)*+:mul(595,736)@mul(585,773) don't() )mul(729,264)who()what()how()&what()mul(275,564)~-$[select()mul(39,239)&!!^;what()mul(601,341)]/'^+^what();when()mul(673,278)/{how()<mul(271,282)+@[&(where()}mul(646,290)#*select(621,911))mul(665,261)where()what()+:-select()mul(213,175)+do()mul(173,446'how(),[why()$^{{who()mul(764,84)]select(537,771)mul(773,449)(<[when()%!from(835,713)-do()/mul(720,225)*-/}##when()*-mul(77,559)!+(*mulwho()what()why()>>from()mul(274,178)<what())select(590,721)where()why():%mul(313,954)why()where()~what()*mul(381,177): mul(706,768)'$mul(409,429)&$?mul(936,16)~+<mul(966,490)]{mul(412,390)when(554,213)mul(686,691)&from(987,857)#)<mul(101,871)mul(55,727)how()*who()),]^mul(743,995)mul(476,492)]~mul(711,765)+~mul(360,962);mul(17,447)how();)@@'how()@mul(300,232)select()how()mul(392,866)%do()?*!why()$,%mul(852,741) '/mul(579,403) 'from() ; *+{-mul(112,650),$mul(388,214)mul}^@when(919,573)-mul(315,603)[{{</ when()from(104,677)+!mul(186,460)^/:%&@mul(411,343)%](select()mul(644,122)where()-,?mul(756,239)'!$;mul(385,894) ;]{why()<}-#{mul(754,260)]$![don't()mul(351,612)^- mul(140~/~-{)mul(221,68)what()mul(162,403)when()@$select()}&+what()when()mul(700,655)mul(130,206)mul(945,326)~how(514,907)%^>#$,;select()mul(937,671)do()(:{?'!from() }mul(819,952)}:^when()%%$mul(408,89)mul(614$:#@[);$mul(66,163)+$mul(449,71)#why()(who()select()]how(421,129)mul(253,770) who(781,473)]mul(634,363)$when()*how() &mul(445,296)how()%>;'what()/,when()mul,>where()##mul(855,89)*select()}why()*select(59,18)<[mul(587,594@$?*where()mul(156,269)[]/mul(253,48)[]?where()*;mul(439,325)@who()who())*?when()#>from()mul(957,103)mul(199,630<(<!#<mul(632,932)!?)-{,mul}%what(){!')don't()~)+{>%where(220,646))!mul(924,669)~/{why(){mul(691,638)*mul(432,319)!]:'-?#from()mul(682,628)where()])why()#mul(103,731)'why()>what()$<why()mul(577,898)<!$^:<from(103,226)!@mul(97'@when()%,[don't()#mul(703,89)who():(where()~#mul(991,496)where()why()from(58,172)'%when()?}mul(85,478)mul(809,637)$mul(353,425)$;why()where()mul(999,285)?select(110,971)%'@why()select():mul(946,404)^$what(187,769)mul~where()why()@,??,>when()mul(709,983)select(655,64),)when()where()!>why()from(905,517)where()mul(278,204)<^%:select()what()mul(948,388): /(;;[what(965,999)@&mul(128,610):]~-how()$mul(752,530)who()'<mul(634,137)when(){{^[don't()>^what()!>!why()mul(486,916)$how(604,686)?@mul(322,302)?[>)mul(773,589)+!?~{/from()mul(461,456)why()~do()+how()-&%*mul(356,968)mul(961,828)(]:?;mul(765,321)& -mul(642,428)'what() why()how()-mul(78,233),]@!(?how()*from()mul(802,766)when()mul(674,430)from()+mul(187,741)]from()& %]}select(61,271)*(mul(699-'<$~?mul(442,143)#select()>when():mul(754,355)where()how()]%@< :]mul(952,528)}from(726,679)*~{), what():mul(747,103)!<mul(43,706)^*{:how()select()who(){+@mul(311,896)>:'+)mul(761,566?,)^#why()}/,mul(713,786)mul(763,306)how()]>-how()+$mul(854,759)~:@from()[#mul(451,677) &->what()?what()mul(688,574)):{-['{mul(680,919)$^~where(393,389));-{where()mul(422,657)from()why(939,633)why()/mul(401,912what()<:%!;>![where()what()mul(262,821)>~*how()~mul(469,992)(+;how()mul(562,853)
mul(596,121)$}why(),who()mul(644~!;()what()mul(414,217):select():@}![];mul(963,916)mul(698,955)mul(887,587)+  mul(664,770)],who()'@,do()++$mul(375,153)}!^~#mul(189,464{:-?# mul(260,699)} -~how():?)who()mul(655,375)why()what()[do()~why()}who():mul(79,366)[$?@select()mul(594,21)(where()!-()select()who()mul(184,709)((?&what()what():when()(from()mul(538,963)~%,mul(638,808)why():mul(865,350)when(){>why()when(644,413){mul(437,972) +<,mul(953,93)>mul(920,599)><mul(851,522)what()why()what())#:&;>mul(81,578)select()}select(),what()?mul*select()mul(269,16)mul(990,699)mul(169,956)where()/$where()[@**{mul(236,175)%$%?$mul(560,233)mul(667,378)-~why();#'{-::mul(744,229)[%}@^^)do()where()-?why()&],::$mul(613,151)((}{>;mul(324,709)],]where()#~?mul(504,448)$where(801,178)}where(),%<*mul(441;/*mul(623,742)#?@how()@mul(447,481)'when()mul(546,493)&$how()+mul(75,277);<;(mul(339,191)mul(460,916) select()~<mul(169,866)$how(911,807)]select()]mul(838,989)*%what()mul(888,490)from()what()]how()'$~from()[;mul(167,932)(from()(who()!don't():[>:mul(655,210)$(#&who()}!mul(402,964)?!;how()[>mul(384,443),mul(715,435):}${mul(683,756)who()!'where()mul(349,78)*from()?';- ><!mul(249,887)'who()#who(236,76)mul(370,349),?who()select()mul(831,598)![& ?mul(540,233):when()?^mul(680,821):what()select()](<#&mul(489,918)what()(,mul(965,528)mul(89,614)#<select()+{@@mul(715,140){>why()$don't()<'/what()-[:;where()who()mul(846,294)mul(382,709) [?@>mul(27,363)%!when()when()~:mul(620,721)[how()! do()mul(729,333)%!mul(822,111)%select()mul(984,174)?how()#' {where()$*mul(126,855)}-$)mul(347,402),+where()mul(542,243){-do()@{&mul(585,736) ^,mul(930,849)%where()]mul(750,188)what()<*(mul(76,528)~+who()*$:when()mul(474,368)$; : {mul(168,683)when()':'*from()(:-mul(857,78){)-mul(776,53)mul(920,130)!<))+why()!do()select()}mul(329,472)mul(507,107)mul(539,64)&^@?mul(716,635)>%~>how()#mul(68,519)-+;*mul(891,188)[where()what()what()?why()#!#mul(985,567)^{mul(429,918)how()do()mul(285,28)<what()who()#!+from(){where()(mul(266,918)(do())mul(729,683)/how(){)what()who()?what()don't()mul(763,38)why()#mul(463,408))#-where(735,678)~>#who())&mul(754,541)select())<what()(%+what()mul(478,223)?mul(117,79)~where()~where()select()[%#don't()*what()mul(313,169)%@{@&mul(463,421)?+)@{(!where(953,46))don't()(&mul(151,326)mul(522,433)mul(231,945)[-)#mul(571,46)from()/$select(),!%{mul(303,851)<mul(89,727)when()mul(47,283)')mul(702,203)!#//?don't()-,mul(825,51)where())))#how();{@mul(807,747):[where()~]'where()do()#@$$@#where()when()%mul(142,121);$+(&?how()@>mul(988,728)?/+mul(644,517)^[<&>why()why()mul(529,314);,-select(),what()mul(952,786)+select(); why()mul(503,655) {[-%]; !+mul(317,344))~{*,&$mul(367,12)mul(84,895)who(177,299)*!~]$+    
";
}