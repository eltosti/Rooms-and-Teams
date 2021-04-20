// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });
const fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


let files = ["rooms.json", "save.json"]
let fileContent = [
    `[
        {
            "Name": "Alchemy Lab",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 1,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 10,
            "Total Cost": 390,
            "Min Size": 8,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as an alchemist's lab (equipment)"
            },
            "Description": "This room aids you when you’re attempting Craft (alchemy) checks, researching new alchemist formulae, and performing similar alchemical tasks. Up to three people can use the room at a time."
        },
        {
            "Name": "Altar",
            "Check Bonus": 3,
            "gp": 0,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 4,
            "Goods Cost": 4,
            "Influence Cost": 3,
            "Labor Cost": 4,
            "Magic Cost": 10,
            "Total Cost": 210,
            "Min Size": 2,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This spiritual focal point has the iconography and materials required for a ceremony. a typical Altar takes the form of a stone altar, but it could also be a sacred pool, a sacrificial pyre, a collection of statuettes, or a similar sacred convergence."
        },
        {
            "Name": "Animal Pen",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 250,
            "Min Size": 4,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "An Animal Pen houses animals that need more attention than horses and cattle. It could be used to house animals for food (like chickens or pigs), display (like song birds or reptiles), or protection (like dogs or large cats). One animal pen can support 1 Large, 2 Medium, 4 Small, or 8 Tiny or smaller creatures, providing them with water and shelter. Food is not provided."
        },
        {
            "Name": "Archery Range",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 25,
            "Goods Cost": 24,
            "Influence Cost": 0,
            "Labor Cost": 24,
            "Magic Cost": 0,
            "Total Cost": 480,
            "Min Size": 20,
            "Max Size": 50,
            "Upgrades": 0,
            "Benefit": {
                "Note": "arrows have only a 5% chance of being lost"
            },
            "Description": "An Archery Range is an open area where one can train with ranged weapons. One end of the range features targets and a soft wall (often several feet of stacked hay or loose earth) to absorb missed shots, while the other side has benches, tables, and firing stands to accommodate trainees. Because the targets and soft wall behind them are designed to absorb ranged attacks, arrows that strike either surface have only a 5% chance of being destroyed or lost."
        },
        {
            "Name": "Armory",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 18,
            "Influence Cost": 9,
            "Labor Cost": 12,
            "Magic Cost": 0,
            "Total Cost": 390,
            "Min Size": 5,
            "Max Size": 15,
            "Upgrades": 0,
            "Benefit": {
                "Note": "provides for 1 Bunks or Guard Post, hastens donning armor"
            },
            "Description": "An Armory stores a variety of armor and weapons, providing enough equipment to supply one Bunks or Guard Post with common equipment (the guards or soldiers leave their armor and weapons here, and you don’t have to pay for individual equipment for them as long as this room is not broken). The room is typically supplied with medium armor and appropriate martial weapons for the guards or soldiers in the building. The Armory contains an array of helpful tools to allow you to don armor in the time it normally takes to don hastily."
        },
        {
            "Name": "Artisan's Workshop",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 18,
            "Influence Cost": 0,
            "Labor Cost": 18,
            "Magic Cost": 0,
            "Total Cost": 360,
            "Min Size": 8,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for one Craft skill"
            },
            "Description": "This specialist’s workshop provides a variety of tools and materials for a particular art form, such as glassworking, gemcutting, or sculpting, which you choose when you build the room. Up to three people can use the room at a time."
        },
        {
            "Name": "Auditorium",
            "Check Bonus": 15,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 38,
            "Influence Cost": 3,
            "Labor Cost": 50,
            "Magic Cost": 0,
            "Total Cost": 910,
            "Min Size": 40,
            "Max Size": 100,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Perform checks"
            },
            "Description": "This large room is used for various artistic performances. It contains a stage, costumes, instruments, and seating for an audience. The superior acoustics and décor grant a +2 bonus on all Perform checks made in this room."
        },
        {
            "Name": "Ballroom",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 38,
            "Influence Cost": 0,
            "Labor Cost": 38,
            "Magic Cost": 0,
            "Total Cost": 760,
            "Min Size": 40,
            "Max Size": 60,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Perform checks"
            },
            "Description": "This large open room is intended for dances, receptions, and other elaborate events. The superior acoustics and decor grant a +2 bonus on all Perform checks made in this room."
        },
        {
            "Name": "Bar",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 250,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Diplomacy checks to gather information"
            },
            "Description": "A Bar stores a selection of drinks and includes a counter for preparing them. After spending an hour with local people in this room, for the next 24 hours you gain a +1 bonus on Diplomacy checks you make to gather information in the settlement."
        },
        {
            "Name": "Bath",
            "Check Bonus": 3,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 8,
            "Goods Cost": 6,
            "Influence Cost": 3,
            "Labor Cost": 4,
            "Magic Cost": 0,
            "Total Cost": 130,
            "Min Size": 3,
            "Max Size": 6,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Fortitude saves against disease"
            },
            "Description": "A Bath contains a single large bathtub or multiple smaller basins, along with a stove for heating water. After spending 1 hour in this room, you gain a +2 bonus on your next ongoing Fortitude save against disease."
        },
        {
            "Name": "Battle Ring",
            "Check Bonus": 15,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 36,
            "Influence Cost": 12,
            "Labor Cost": 32,
            "Magic Cost": 0,
            "Total Cost": 800,
            "Min Size": 40,
            "Max Size": 100,
            "Upgrades": 0,
            "Benefit": {
                "Note": "contestant gains a bonus on Intimidate and performance combat checks"
            },
            "Description": "This enclosed field is used for some form of dangerous contest, from nonlethal sports like wrestling or boxing to lethal blood sports such as animal fights or gladiatorial combat. It includes seating for spectators, appropriate flooring (padded or sandy), and often some manner of barrier between the audience and combatants. Each day, the person in charge of the Battle Ring can grant one combatant a +2 bonus on Intimidate and performance combat checks. This benefit applies only within the settlement."
        },
        {
            "Name": "Bedroom",
            "Check Bonus": 3,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 4,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Bedroom provides comfort and privacy for one to two people, and typically features one large bed or two smaller beds. Many also have furnishings or features, such as chairs, wardrobes, chests, tables, or small fireplaces. a Bedroom might be the sleeping place of a building’s owner or a comfortable room for rent."
        },
        {
            "Name": "Bell Tower",
            "Check Bonus": 1,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 1,
            "Time": 28,
            "Goods Cost": 22,
            "Influence Cost": 9,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 450,
            "Min Size": 9,
            "Max Size": 25,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This two-story room contains one or more bells suitable for warnings or music, along with bell pulls for operating the instruments from below. The bells can be heard up to 1 mile away."
        },
        {
            "Name": "Blind",
            "Check Bonus": 2,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 10,
            "Goods Cost": 12,
            "Influence Cost": 12,
            "Labor Cost": 12,
            "Magic Cost": 0,
            "Total Cost": 360,
            "Min Size": 10,
            "Max Size": 30,
            "Upgrades": 0,
            "Benefit": {
                "Note": "Perception DC 15 to see through"
            },
            "Description": "A Blind is a semisolid wall constructed out of area-appropriate debris and flora. Between 10 and 15 feet high, a Blind helps to conceal any structures behind it as it blends in with the nearby landscape. Structures behind a Blind can be seen only with a successful DC 15 Perception check, and targets of ranged attacks made through a blind gain concealment. One Blind can cover 20 squares’ worth of structures; multiple Blinds can be used to conceal larger structures. A Blind can be thickened for double the construction cost, increasing the DC of the Perception check to see through the Blind to 20 and granting total concealment to creatures hiding behind it."
        },
        {
            "Name": "Blind - Thickened",
            "Check Bonus": 3,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 24,
            "Influence Cost": 24,
            "Labor Cost": 24,
            "Magic Cost": 0,
            "Total Cost": 720,
            "Min Size": 10,
            "Max Size": 30,
            "Upgrades": 0,
            "Benefit": {
                "Note": "Perception DC 20 to see through"
            },
            "Description": "A Blind is a semisolid wall constructed out of area-appropriate debris and flora. Between 10 and 15 feet high, a Blind helps to conceal any structures behind it as it blends in with the nearby landscape. Structures behind a Blind can be seen only with a successful DC 15 Perception check, and targets of ranged attacks made through a blind gain concealment. One Blind can cover 20 squares’ worth of structures; multiple Blinds can be used to conceal larger structures. A Blind can be thickened for double the construction cost, increasing the DC of the Perception check to see through the Blind to 20 and granting total concealment to creatures hiding behind it."
        },
        {
            "Name": "Blood Spa",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 28,
            "Goods Cost": 20,
            "Influence Cost": 12,
            "Labor Cost": 14,
            "Magic Cost": 60,
            "Total Cost": 1060,
            "Min Size": 4,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": "Reduces age penalties"
            },
            "Description": "This room houses a sumptuous tub and alchemical piping that allow a villain to alleviate some of the effects of aging by bathing in the blood of a freshly killed humanoid of less than middle age. The corpse is suspended over the tub via ceiling clamps that can be recessed out of sight in the ceiling. Bathing for an hour in this room reduces any ability score penalties from advanced age by 1 for a duration of 1 week and makes the bather appear younger. Multiple treatments stack. Each corpse provides enough blood for only 1 treatment."
        },
        {
            "Name": "Book Repository",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 6,
            "Labor Cost": 14,
            "Magic Cost": 10,
            "Total Cost": 460,
            "Min Size": 4,
            "Max Size": 12,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Knowledge checks of one type"
            },
            "Description": "A Book Repository contains shelves upon shelves of books, in addition to chairs, desks, and tables for reading and studying. Most repositories contain books on a wide array of topics providing a general wealth of information, but some contain books focused on a specific topic. When you construct a Book Repository, select one Knowledge skill. If someone has a question relating to that Knowledge skill and is able to spend 1 hour researching in the Book Repository, she gains a +3 bonus on the Knowledge check to answer the question."
        },
        {
            "Name": "Brewery",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 24,
            "Goods Cost": 18,
            "Influence Cost": 6,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 380,
            "Min Size": 12,
            "Max Size": 24,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Brewery allows you to ferment or distill ingredients such as fruits and grain to create potent beverages."
        },
        {
            "Name": "Bunks",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 0,
            "Influence": 0,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 24,
            "Goods Cost": 14,
            "Influence Cost": 12,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 400,
            "Min Size": 15,
            "Max Size": 35,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "Bunks provide housing and limited storage for up to 10 people. Though hardly private, this space typically includes beds or cots, linens, small chests with poor locks, and chamber pots. If this room is part of an Inn, the building is more of a flophouse or hostel than a traveler’s hotel, which would have private rooms. If part of a Hospital, this room houses patients."
        },
        {
            "Name": "Burial Ground",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 8,
            "Goods Cost": 8,
            "Influence Cost": 9,
            "Labor Cost": 8,
            "Magic Cost": 10,
            "Total Cost": 350,
            "Min Size": 20,
            "Max Size": 30,
            "Upgrades": 1,
            "Benefit": {
                "Note": "prevents or creates undead, upgrade to consecrate/desecrate"
            },
            "Description": "This somber plot of land is dedicated to the internment of the dead. Up to 20 Medium or smaller corpses can be buried here, their plots clearly marked by gravestones, statues, or other markers. For an additional 200 gp, this area can be consecrated as holy or unholy ground. a corpse buried in holy ground cannot be animated as an undead creature. A corpse buried in unholy ground has a 5% chance every month of reanimating as an uncontrolled zombie. If you upgrade a Burial Ground, the area retains the consecration effect."
        },
        {
            "Name": "Cell",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 10,
            "Influence Cost": 0,
            "Labor Cost": 8,
            "Magic Cost": 0,
            "Total Cost": 180,
            "Min Size": 1,
            "Max Size": 9,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Can additionally buy normal/mw manacles/fetters"
            },
            "Description": "This uncomfortable room can imprison 1 to 4 captives. It is typically nothing more than a stone room with a straw-lined floor, though some might have the barest of comforts, like cots or chamber pots. One wall is typically constructed of sturdy bars and a door affixed with a simple lock. You can install manacles or masterwork manacles at the normal price of those items."
        },
        {
            "Name": "Ceremonial Room",
            "Check Bonus": 10,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 1,
            "Time": 40,
            "Goods Cost": 32,
            "Influence Cost": 6,
            "Labor Cost": 30,
            "Magic Cost": 50,
            "Total Cost": 1180,
            "Min Size": 40,
            "Max Size": 100,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Bluff, Diplomacy, and Intimidate checks (see below)"
            },
            "Description": "This is a large, open room for important events such as religious services, town meetings, and weddings. It often features an elevated area for the focus or leader of the event, and might have seats for others in attendance. A person leading or officially speaking at the event gains a +1 bonus on Bluff, Diplomacy, and Intimidate checks to influence others at the event. This bonus ends when the event ends."
        },
        {
            "Name": "Classroom",
            "Check Bonus": 8,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 1,
            "Time": 14,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 250,
            "Min Size": 5,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This small meeting place gives numerous attendees an unobstructed view of a single lecturer. Many classrooms contain seating for those in attendance, a lectern, and a display table or chalkboard."
        },
        {
            "Name": "Clockwork Shop",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 18,
            "Influence Cost": 0,
            "Labor Cost": 18,
            "Magic Cost": 0,
            "Total Cost": 360,
            "Min Size": 8,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for Craft (clockwork)"
            },
            "Description": "This workshop provides all of the precision tools and workstations required for creating delicate clockwork goods. Up to three people can use the room at a time."
        },
        {
            "Name": "Common Room",
            "Check Bonus": 7,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 14,
            "Influence Cost": 0,
            "Labor Cost": 16,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 10,
            "Max Size": 30,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This versatile open area has enough space for many people to use at once. a Common Room is typically furnished with benches, chairs, cushions, mats, pews, or stools, and might have tables."
        },
        {
            "Name": "Confessional",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 4,
            "Goods Cost": 4,
            "Influence Cost": 0,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 100,
            "Min Size": 2,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Stealth checks"
            },
            "Description": "This pair of tiny, linked rooms allows for private conversations. Alternatively, you may construct a hidden space that allows you to watch another room without being observed, such as through a peephole in a tapestry or mosaic. One side of this room provides a +4 bonus on Stealth checks to hide from creatures in the adjoining room. a Confessional can be constructed in a way that allows this bonus to apply to creatures in both sides or just in one."
        },
        {
            "Name": "Courtyard",
            "Check Bonus": 5,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 1,
            "Time": 24,
            "Goods Cost": 8,
            "Influence Cost": 0,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 180,
            "Min Size": 20,
            "Max Size": 40,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This large, open area might be constructed to feature decorative landscaping or be a more utilitarian space for drills, meetings, or storage."
        },
        {
            "Name": "Crypt",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 1,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 10,
            "Influence Cost": 9,
            "Labor Cost": 10,
            "Magic Cost": 20,
            "Total Cost": 490,
            "Min Size": 8,
            "Max Size": 30,
            "Upgrades": 1,
            "Benefit": {
                "Note": "doubles duration of spells that preserve/protect corpses, Can consecrate/desecrate"
            },
            "Description": "This space is dedicated to the storage of prominent corpses. Above ground this space might take the form of a tomb. The duration of spells that preserve or protect corpses (such as gentle repose) are doubled when cast on a corpse that remains in this room."
        },
        {
            "Name": "Defensive Wall (Stone)",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 24,
            "Goods Cost": 20,
            "Influence Cost": 12,
            "Labor Cost": 20,
            "Magic Cost": 0,
            "Total Cost": 520,
            "Min Size": 20,
            "Max Size": 40,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Upgrade lock/door"
            },
            "Description": "This simple wooden wall, fence, or hedge surrounds your structure and provides a modicum of security. It is no taller than 10 feet, includes a single gate with a simple lock, and can be scaled with a DC 14 Climb check. It can be constructed as a stone wall — increasing the height by up to 10 feet and the Climb DC to 20 — by doubling the price. If combined with a Guard Post, this can be a walkable wall with a parapet."
        },
        {
            "Name": "Defensive Wall (Wood)",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 12,
            "Goods Cost": 10,
            "Influence Cost": 6,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 260,
            "Min Size": 20,
            "Max Size": 40,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Upgrade lock/door"
            },
            "Description": "This simple wooden wall, fence, or hedge surrounds your structure and provides a modicum of security. It is no taller than 10 feet, includes a single gate with a simple lock, and can be scaled with a DC 14 Climb check. It can be constructed as a stone wall — increasing the height by up to 10 feet and the Climb DC to 20 — by doubling the price. If combined with a Guard Post, this can be a walkable wall with a parapet."
        },
        {
            "Name": "Dock",
            "Check Bonus": 12,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 14,
            "Influence Cost": 6,
            "Labor Cost": 12,
            "Magic Cost": 0,
            "Total Cost": 320,
            "Min Size": 10,
            "Max Size": 30,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This is a series of walkways and sturdy posts used to safely moor a water vessel such as a boat or ship. If attached to Storage, it allows you to easily move cargo to and from the water."
        },
        {
            "Name": "Dojo",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 14,
            "Influence Cost": 3,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 310,
            "Min Size": 15,
            "Max Size": 30,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as a training facility for training or retraining"
            },
            "Description": "This open area is used for practicing combat or other physical skills. If used for combat training, it includes humanoid-shaped training dummies or silhouettes for target practice. Most Dojos include simple floor mats or straw pallets to cushion falls, plus racks containing nonlethal versions of standard weapons. If used by a Thieves’ Guild, instead of combat the Dojo might instead focus on evasion training, picking locks, and disabling traps. You can use a Dojo to train up to 10 people at a time. It can be used as Bunks, though it is much less comfortable than using actual beds or cots."
        },
        {
            "Name": "Drawbridge",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 6,
            "Goods Cost": 16,
            "Influence Cost": 6,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 320,
            "Min Size": 4,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This retractable bridge spans a pit, moat, or similar danger, allowing you to control access to an area. You can raise or lower the bridge by spending a full-round action to operate the mechanisms constructed on either side of the span. When raised, the bridge creates a wooden barrier (hardness 5, 40 hit points). If the Drawbridge is destroyed, it can be rebuilt in the same place for half the initial construction price."
        },
        {
            "Name": "Empty Room",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 0,
            "Goods Cost": 0,
            "Influence Cost": 0,
            "Labor Cost": 0,
            "Magic Cost": 0,
            "Total Cost": 0,
            "Min Size": 1,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": "For trap rooms, or future expansion"
            },
            "Description": ""
        },
        {
            "Name": "Escape Route",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 18,
            "Influence Cost": 0,
            "Labor Cost": 18,
            "Magic Cost": 0,
            "Total Cost": 360,
            "Min Size": 6,
            "Max Size": 12,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Upgrade lock/door"
            },
            "Description": "This is a hallway or tunnel leading to a hidden exit from the building. The exit door is typically a simple wooden door with an average lock (Disable Device DC 20 to open). Either or both ends of the hallway can be secret doors (Perception DC 20 to notice)."
        },
        {
            "Name": "Execution Yard",
            "Check Bonus": 10,
            "gp": 0,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 24,
            "Goods Cost": 16,
            "Influence Cost": 6,
            "Labor Cost": 20,
            "Magic Cost": 0,
            "Total Cost": 420,
            "Min Size": 20,
            "Max Size": 40,
            "Upgrades": 0,
            "Benefit": {
                "Note": "Bonus to Intimidate checks in settlement"
            },
            "Description": "This open area is used to host public executions. The execution device, such as a headsman’s block or gallows, occupies a dais in the yard’s center. Surrounding it are viewing galleries for guests of assorted status and plenty of standing room for lower-class rabble. Gibbets or pikes around the yard display the condemned, granting a +3 bonus on Intimidate checks within the settlement to whoever publicly ordered the execution."
        },
        {
            "Name": "False Front",
            "Check Bonus": 2,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 12,
            "Goods Cost": 8,
            "Influence Cost": 3,
            "Labor Cost": 8,
            "Magic Cost": 0,
            "Total Cost": 190,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus to Perception and Sense Motive DCs"
            },
            "Description": "This simple, nondescript business uses an innocuous front to hide criminal dealings. It might appear to be a low-quality pawnshop or ill-stocked market. It has the bare necessities for functioning as the kind of business it pretends to be, but its true purpose is to conceal the nature of the building—typically a criminal enterprise or secret meeting place, such as a cult’s sanctuary or a den of thieves. The room includes a secret door leading to the rest of the building. The room increases Perception and Sense Motive DCs by 5 for those trying to notice unusual activity or determine whether the building is what it seems. Since a False Front contains both a false Storefront and false display area, its space can be upgraded to both Storage and a Storefront simultaneously (or upgraded to just one, leaving the remaining area unused)."
        },
        {
            "Name": "Farmland",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 30,
            "Influence Cost": 0,
            "Labor Cost": 30,
            "Magic Cost": 0,
            "Total Cost": 600,
            "Min Size": 60,
            "Max Size": 100,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This large swath of fertile land is used for farming or fodder for livestock. The price for this room includes clearing the land, fertilizing the soil, and so on. At the GM’s discretion, you might discover a plot of available land that automatically counts as a Farmland at no cost."
        },
        {
            "Name": "Forge",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 18,
            "Influence Cost": 3,
            "Labor Cost": 16,
            "Magic Cost": 0,
            "Total Cost": 370,
            "Min Size": 8,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for smithing skills"
            },
            "Description": "A Forge includes a hearth, an anvil, a slack tub, metalworking tools, and other appropriate materials for shaping iron and other metals. A Forge counts as masterwork artisan’s tools for up to three people working on metalworking skills such as Craft (armor) and Craft (weapons)."
        },
        {
            "Name": "Game Room (Illegal)",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Game Room has tables for gambling or other forms of gaming, and is often used to make wagers on blood sports or other illicit activities. The listed Earnings includes illegal gaming. If your building allows only legal gaming (whether recreational or using money), the Earnings are gp +5 (not +10) and the Benefit is Crime +0, Danger +0."
        },
        {
            "Name": "Game Room (Legal)",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Game Room has tables for gambling or other forms of gaming, and is often used to make wagers on blood sports or other illicit activities. The listed Earnings includes illegal gaming. If your building allows only legal gaming (whether recreational or using money), the Earnings are gp +5 (not +10) and the Benefit is Crime +0, Danger +0."
        },
        {
            "Name": "Garden",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 12,
            "Goods Cost": 10,
            "Influence Cost": 0,
            "Labor Cost": 8,
            "Magic Cost": 0,
            "Total Cost": 180,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This area of carefully tended soil is fit for growing plants that require greater attention than crops, though you can use it to grow food crops if you choose."
        },
        {
            "Name": "Gatehouse",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 30,
            "Influence Cost": 9,
            "Labor Cost": 24,
            "Magic Cost": 0,
            "Total Cost": 630,
            "Min Size": 8,
            "Max Size": 12,
            "Upgrades": 1,
            "Benefit": {
                "Note": "defenders get bonus on initiative and Perception checks, can upgrade door"
            },
            "Description": "This defensive structure prevents access to a building. It is normally arranged so defenders have a clear line of sight to all room entrances or a clear view of all approaches to the building. It includes a strong wooden door with a good lock. You can improve this to an iron door for 500 gp. You can add a wooden portcullis for 500 gp or an iron portcullis for 1,000 gp. For an additional 80 gp, you can also count this room as a Gauntlet, allowing defenders to fall back and trap intruders here. You can construct this room in a tower layout (at no additional cost), which includes a second story that also counts as a Gatehouse. The listed price includes the cost of having unskilled employees as guards (1st-level commoners or experts with uniforms, but no armor or weapons). If the building has an Armory, these employees are armed and armored, but still mostly for show. If you want trained guards who can defend against dangerous intruders, hire professional guards or recruit a team of Guards or Soldiers. You can use a Gatehouse as a Tollbooth, which provides the same Earnings (gp or Goods +4). Any defender using the Gatehouse’s defenses gains a +1 bonus on initiative checks and on Perception checks against intruders at the Gatehouse."
        },
        {
            "Name": "Greenhouse",
            "Check Bonus": 12,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This garden is protected by glass and has its interior climate deliberately regulated. Delicate or exotic plants raised in this area grow larger and healthier than in a normal garden. Certain types of rare plants can be raised only in a Greenhouse."
        },
        {
            "Name": "Grotto",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 30,
            "Goods Cost": 30,
            "Influence Cost": 0,
            "Labor Cost": 20,
            "Magic Cost": 0,
            "Total Cost": 500,
            "Min Size": 5,
            "Max Size": 10,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Grotto is a naturally or artificially shaped cave in which people can live. Compared to a standard cave, a Grotto will usually boast features that make habitation more pleasant, such as door-sized openings, access to neighboring caves or water, and adequate ventilation."
        },
        {
            "Name": "Guantlet",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 10,
            "Goods Cost": 8,
            "Influence Cost": 0,
            "Labor Cost": 8,
            "Magic Cost": 0,
            "Total Cost": 160,
            "Min Size": 4,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": "defenders get improved cover"
            },
            "Description": "This is an area with murder holes or similar defenses that give defenders an advantage when attacking or spying upon intruders. It has good wooden doors with simple locks to allow defenders to trap invaders inside. Any defender using the Gauntlet’s defenses has improved cover against intruders in the Gauntlet, though these defenses limit what attacks the defenders can make. For example, a defender can shoot through a murder hole with a spell, bow, or crossbow, or can pour boiling water through it, but she can’t attack through it with an axe."
        },
        {
            "Name": "Guard Post",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 14,
            "Influence Cost": 6,
            "Labor Cost": 12,
            "Magic Cost": 0,
            "Total Cost": 320,
            "Min Size": 6,
            "Max Size": 10,
            "Upgrades": 0,
            "Benefit": {
                "Note": "defenders get a bonus on initiative and Perception checks"
            },
            "Description": "This defensive structure prevents access to a building. It is normally arranged so defenders have a clear line of sight to all room entrances or a clear view of all approaches to the building. You can construct this room in a tower layout (at no additional cost), which includes a second story that also counts as a Guard Post. The listed price includes the cost of having unskilled employees as guards (1st-level commoners or experts with uniforms, but no armor or weapons). If the building has an Armory, these employees are armed and armored, but still mostly for show. If you want trained guards who can defend against dangerous intruders, hire professional guards or recruit a team of Guards or Soldiers. Any defender using the Guard Post’s defenses gains a +1 bonus on initiative checks and on Perception checks against intruders at the Guard Post."
        },
        {
            "Name": "Habitat",
            "Check Bonus": 12,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 36,
            "Influence Cost": 9,
            "Labor Cost": 34,
            "Magic Cost": 0,
            "Total Cost": 790,
            "Min Size": 40,
            "Max Size": 60,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Habitat houses animals. Unlike a Stall or Hatchery, a Habitat provides comfortable lodging for exotic or rare creatures. This room contains cages and walled chambers for the resident creatures, with at least one wall constructed of bars or windows to allow visitors to observe the creatures. a Habitat built to house birds is often constructed with tall poles and netting to keep the creatures from flying away."
        },
        {
            "Name": "Hatchery",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 10,
            "Goods Cost": 8,
            "Influence Cost": 3,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 170,
            "Min Size": 2,
            "Max Size": 6,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Hatchery is used for nesting and hatching egg-laying creatures such as birds, lizards, owlbears, or dragons. Alternatively, it can be used for fish, shellfish, or other aquatic egg-laying creatures. This room might be on the roof to allow flying creatures to come and go, or might be connected to the building on ground level. It contains cages and soft bedding to cradle the eggs, and might contain a small wood-burning stove to keep the eggs warm if parent animals aren’t available."
        },
        {
            "Name": "Infirmary",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 12,
            "Magic Cost": 10,
            "Total Cost": 370,
            "Min Size": 4,
            "Max Size": 12,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as a healer's kit (see below)"
            },
            "Description": "An Infirmary is used for treating injured and sick people. It contains beds or cots, a wash basin, and medical supplies. This counts as having a healer’s kit for up to two healers at a time. As long as the building doesn’t have the broken condition, you don’t need to track individual uses of these healer’s kits."
        },
        {
            "Name": "Kitchen",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 12,
            "Goods Cost": 8,
            "Influence Cost": 0,
            "Labor Cost": 8,
            "Magic Cost": 0,
            "Total Cost": 160,
            "Min Size": 2,
            "Max Size": 6,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Kitchen is used to prepare food. It contains a stove, sink, and small pantry with basic cooking tools and supplies. a Kitchen for a business that serves food, such as an Inn, probably also has Storage just for foodstuffs."
        },
        {
            "Name": "Labyrinth",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 30,
            "Goods Cost": 30,
            "Influence Cost": 0,
            "Labor Cost": 30,
            "Magic Cost": 0,
            "Total Cost": 600,
            "Min Size": 40,
            "Max Size": 100,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Labyrinth is a walled maze, hedge maze, or simple tiled pattern on the ground that those in need of tranquility can walk for quiet meditation."
        },
        {
            "Name": "Laundry",
            "Check Bonus": 3,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 8,
            "Goods Cost": 6,
            "Influence Cost": 0,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 120,
            "Min Size": 2,
            "Max Size": 6,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Fortitude saves against contracting disease"
            },
            "Description": "A Laundry contains a large vat for soaking clothes, a cauldron to heat water, washboards, drying lines, and racks and bins for dry clothes. This might be an outside area adjacent to a building. Employees and regular users of a Laundry gain a +1 bonus on Fortitude saves to resist contracting a disease while they’re in the settlement."
        },
        {
            "Name": "Lavoratory",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 4,
            "Goods Cost": 6,
            "Influence Cost": 0,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 120,
            "Min Size": 1,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": "Bonus on Fortitude saves against contracting disease"
            },
            "Description": "A Lavatory includes up to four 5-foot-by-5-foot private rooms for dealing with biological functions. If a building doesn’t have a Lavatory, people in it must go elsewhere for this sort of activity. Depending on the building and settlement, a Lavatory might be an outhouse, a closet with a chamber pot, or a stool connected to an external system such as a cesspit or pig trough. If the building has a Sewer Access, you can automatically connect all Lavatories in the building to the settlement’s sewer system. The sanitation improvement from having a Lavatory mean residents, guests, employees, and others who frequent the building gain a +2 bonus on Fortitude saves to resist contracting a disease while in the settlement."
        },
        {
            "Name": "Leather Workshop",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 14,
            "Influence Cost": 3,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 310,
            "Min Size": 4,
            "Max Size": 10,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for leatherworking skills"
            },
            "Description": "This workshop includes a sturdy table, stool, vats, drying racks, and tools designed for turning raw hides into leather. The Leather Workshop counts as masterwork artisan’s tools for up to three people creating leather goods with skills such as Craft (leather) and Craft (shoes)."
        },
        {
            "Name": "Lodging",
            "Check Bonus": 12,
            "gp": 1,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 30,
            "Goods Cost": 20,
            "Influence Cost": 3,
            "Labor Cost": 20,
            "Magic Cost": 0,
            "Total Cost": 430,
            "Min Size": 20,
            "Max Size": 35,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This area is subdivided into smaller chambers and provides private housing and limited storage for up to 10 people. Each chamber typically includes one or two small beds, linens, a chamber pot, and a small table and chair. The door to the chamber is a simple wooden door with a simple lock. You may upgrade individual locks by paying the price difference between a simple lock and the desired lock."
        },
        {
            "Name": "Magical Repository",
            "Check Bonus": 12,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 1,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 18,
            "Influence Cost": 9,
            "Labor Cost": 16,
            "Magic Cost": 30,
            "Total Cost": 730,
            "Min Size": 4,
            "Max Size": 12,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Knowledge (arcana), Spellcraft, and spell research checks"
            },
            "Description": "A Magical Repository is similar to a Book Repository, but specific to the study of the arcane arts. It contains shelves of books, comfortable chairs, and tables for studying and for scribing notes and scrolls. If you construct this room from scratch, it grants someone who studies there for 1 hour a +3 bonus on a Knowledge (arcana) check to answer a question. If you upgrade a Book Repository into this room, you either keep the original Book Repository’s bonus on Knowledge checks or change its skill to Knowledge (arcana). An hour of study in this room also grants a +3 bonus on Spellcraft checks. The room grants an additional +1 bonus on Knowledge (arcana) and Spellcraft checks for spell research (see Research a Spell) and crafting magic items."
        },
        {
            "Name": "Mill Room",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 20,
            "Max Size": 30,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Mill Room contains a mechanism to process grain, foodstuffs, and other raw materials. Most simple mills are powered by hand, but those powered by horses or other beasts of burden require a stable, those powered by water require running water for the water wheel, and those powered by wind require a tower."
        },
        {
            "Name": "Mystic Greenhouse",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 0,
            "Magic": 1,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 16,
            "Influence Cost": 9,
            "Labor Cost": 14,
            "Magic Cost": 50,
            "Total Cost": 890,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": "Other creatures gain a +2 bonus on Charisma checks and Charisma-based skill checks against creatures that have spent the past 24 hours inside"
            },
            "Description": "A Mystic Greenhouse has been specially modified to accommodate both the mundane and magical needs of supernatural plants and creatures of the plant type, making them easier to work with. In addition to the glass walls of a traditional Greenhouse, this chamber is set with devices that focus ambient magical energy to the benefit of those creatures growing inside, such as rune-inscribed plates or mirrors arranged to reflect and funnel magical energy. After a full day of exposure to the Mystical Greenhouse’s beneficial effects, creatures within become relaxed and compliant. Other creatures gain a +2 bonus on Charisma checks and Charisma-based skill checks against creatures that have spent the past 24 hours in a Mystic Greenhouse."
        },
        {
            "Name": "Nursery",
            "Check Bonus": 6,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 14,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 250,
            "Min Size": 8,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Nursery is used to care for infants and children. It contains cribs and beds for children, toys for their entertainment, a table for changing, and cabinets for supplies."
        },
        {
            "Name": "Observation Dome",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 1,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 18,
            "Magic Cost": 10,
            "Total Cost": 440,
            "Min Size": 10,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Knowledge (geography), Knowledge (nature), and Knowledge (planes) checks"
            },
            "Description": "This elevated room is open to the sky, has a skylight, or has a retractable roof to allow you to observe the passing of celestial bodies. An Observation Dome includes shelves containing records and notes, a telescope, and other devices dedicated to celestial study. If someone spends 1 hour researching in the Observation Dome, she gains a +2 bonus on Knowledge (geography), Knowledge (nature), and Knowledge (planes) checks to answer a question about the heavens."
        },
        {
            "Name": "Office",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 8,
            "Goods Cost": 6,
            "Influence Cost": 0,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 120,
            "Min Size": 2,
            "Max Size": 5,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This simple room includes a door with a simple lock, a chair, and a large desk that has two drawers with simple locks. An Office affords its user privacy and a refuge from other activity in the building."
        },
        {
            "Name": "Pit",
            "Check Bonus": 1,
            "gp": 1,
            "Goods": 0,
            "Influence": 0,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 2,
            "Goods Cost": 2,
            "Influence Cost": 0,
            "Labor Cost": 2,
            "Magic Cost": 0,
            "Total Cost": 40,
            "Min Size": 1,
            "Max Size": 5,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This is a place to dump things no longer needed. It can be used to contain refuse, dangerous waste, and piles of junk, or as a mass graveyard, communal latrine, or crude surface well. a typical pit is 5–15 feet deep with steep sides."
        },
        {
            "Name": "Printer",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 18,
            "Influence Cost": 6,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 380,
            "Min Size": 5,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for writing and printing skills"
            },
            "Description": "This specialized workshop contains a printing press, storage for paper, and drying racks for finished books and pamphlets. Up to three people can use the room at a time."
        },
        {
            "Name": "Rangelands",
            "Check Bonus": 15,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 365,
            "Goods Cost": 200,
            "Influence Cost": 0,
            "Labor Cost": 0,
            "Magic Cost": 0,
            "Total Cost": 2000,
            "Min Size": 300,
            "Max Size": 500,
            "Upgrades": 0,
            "Benefit": {
                "Note": "(may need boosting)"
            },
            "Description": "Rangelands are vast, unfenced areas of natural terrain that can be used to run large herds of cattle such as aurochs, horses, and sheep. While Rangelands can produce a significant profit, they involve a major investment of time and effort to maintain long enough for the herd to produce new livestock, as well as for livestock born in previous years to grow enough to be butchered, sheared, or otherwise harvested. Rangelands are different from pastures or farmlands in that they contain only native, local plant life, rather than crops placed to make them more effective grazing lands. Small communities often depend on Rangelands as their primary sources of income, and it is not uncommon for tribes to go to war over control of local Rangelands."
        },
        {
            "Name": "Reliquary",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 12,
            "Goods Cost": 8,
            "Influence Cost": 0,
            "Labor Cost": 8,
            "Magic Cost": 10,
            "Total Cost": 260,
            "Min Size": 1,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Knowledge (religion) checks relating to its contents"
            },
            "Description": "A Reliquary is built to securely store religious artifacts, and dedicated to a specific deity or philosophy. It contains shelves to house the items, special display cases to protect them, and sometimes chairs and tables to allow study. It’s secured by a strong wooden door or grating with a good lock. Unlike a Vault, a Reliquary is intended to allow people to observe its contents. When stocked with relics appropriate to the chosen deity or philosophy, the room grants a +1 bonus on Knowledge (religion) checks relating to the history, powers, and purpose of those relics."
        },
        {
            "Name": "Reservoir",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 20,
            "Influence Cost": 0,
            "Labor Cost": 20,
            "Magic Cost": 0,
            "Total Cost": 400,
            "Min Size": 25,
            "Max Size": 50,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Reservoir System is a series of interconnected pools or tanks meant to collect and hold water from rains, springs, and other natural sources to act as a resource for plumbing networks or a source of water during times of drought. The pools are sealed to minimize water loss from evaporation and absorption into the surrounding ground, so the Reservoir System can be relied on throughout an entire dry season."
        },
        {
            "Name": "Sanctum",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 6,
            "Goods Cost": 4,
            "Influence Cost": 3,
            "Labor Cost": 2,
            "Magic Cost": 10,
            "Total Cost": 190,
            "Min Size": 1,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on one Will save"
            },
            "Description": "This is a basic room with simple and pleasing decorations, clean lines, and a calming environment perfect for meditation, prayer, and solitude. a person who spends at least 4 hours in a Sanctum doing nothing other than praying or meditating gains a +1 bonus on Will saves. This bonus ends once the person leaves the settlement or after the first time she attempts a Will save."
        },
        {
            "Name": "Sauna",
            "Check Bonus": 3,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 8,
            "Goods Cost": 6,
            "Influence Cost": 0,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 120,
            "Min Size": 2,
            "Max Size": 5,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on disease and negative level recovery saves"
            },
            "Description": "This simple room contains benches, a central source of heat, stones, and a container of water with a ladle to help produce steam. Using a Sauna for an hour grants a person a +1 bonus on saving throws to overcome ongoing diseases (but not on saves to resist contracting diseases) and a +1 bonus on saving throws to recover from negative levels. This bonus goes away after 24 hours."
        },
        {
            "Name": "Scriptorium",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 1,
            "Magic": 1,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 14,
            "Influence Cost": 6,
            "Labor Cost": 12,
            "Magic Cost": 0,
            "Total Cost": 320,
            "Min Size": 5,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for writing skills"
            },
            "Description": "A Scriptorium is where scribes do their work. It contains chairs and writing desks, as well as ink, paper, and other supplies needed to create or copy written works. Up to three people can use the room at a time for scribing scrolls or using Craft (calligraphy) or Profession (scribe)."
        },
        {
            "Name": "Scrying Room",
            "Check Bonus": 2,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 30,
            "Total Cost": 550,
            "Min Size": 4,
            "Max Size": 16,
            "Upgrades": 1,
            "Benefit": {
                "Note": "increases the DC of scrying effects, can buy better scrying surface"
            },
            "Description": "A Scrying Room is built to be a quiet place for scrying, seances, and similar divinations. It contains a table, chairs, and either a pool of water (at no additional cost) or a suitable focus object for a scrying spell (for an additional 1,000 gp). A caster using scrying, locate creature, or a similar targeted divination from here increases the spell’s DC by 1."
        },
        {
            "Name": "Secret Room",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 10,
            "Influence Cost": 0,
            "Labor Cost": 12,
            "Magic Cost": 0,
            "Total Cost": 220,
            "Min Size": 6,
            "Max Size": 10,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Upgrade lock/door"
            },
            "Description": "This is either a room or a passage connecting two rooms in the building. The access to this space is controlled by a secret door (DC 20). A passage can have secret doors at both ends or a normal door at one end and a secret door at the other. If it’s a room, it is typically used to hide someone or something you don’t want discovered. If it’s a passage, it’s typically used for clandestine travel within the building, often for the purpose of smuggling or spying. For every 500 extra gp you spend, you can improve one secret door in the building to a well-hidden secret door (DC 30)."
        },
        {
            "Name": "Sewer Access",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 4,
            "Goods Cost": 4,
            "Influence Cost": 3,
            "Labor Cost": 4,
            "Magic Cost": 0,
            "Total Cost": 110,
            "Min Size": 4,
            "Max Size": 6,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Upgrade lock/door"
            },
            "Description": "A Sewer Access might be a tunnel or room, or something as simple as a sturdy trap door in the floor. Constructing it requires a settlement with a sewer or septic system, and connects some part of the building to that system. You can use this as an Escape Route, but only to get to and from the sewer. The door to the sewer is a strong wooden door with a good lock. For an additional 500 gp, it has an iron door instead. If you have a Lavatory and Sewer Access, you may automatically connect the Lavatory to the sewer with indoor plumbing."
        },
        {
            "Name": "Sewing Room",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 6,
            "Max Size": 12,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for one Craft skill"
            },
            "Description": "A Sewing Room is used for designing heraldry and making cloth garments, tapestries, blankets, carpets, linens, and other textiles. It contains a loom; a spinning wheel; tapestry frames; shelves for fabric; worktables; and tools for spinning, weaving, and sewing. Up to three people can use the room at once; gaining the benefit of masterwork artisan’s tools for skills such as Craft (cloth) and Craft (clothing), and for related skills such as Craft (baskets)."
        },
        {
            "Name": "Shack (Stone)",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 6,
            "Goods Cost": 8,
            "Influence Cost": 0,
            "Labor Cost": 8,
            "Magic Cost": 0,
            "Total Cost": 160,
            "Min Size": 2,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This no-frills wooden shelter contains a simple table, pallet bed, and stool. One person can build a shack with simple tools and basic materials. For an additional 1 point of Goods and 2 points of Labor, you can construct a brick or stone hut instead of a wooden shack."
        },
        {
            "Name": "Shack (Wood)",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 3,
            "Goods Cost": 6,
            "Influence Cost": 0,
            "Labor Cost": 4,
            "Magic Cost": 0,
            "Total Cost": 100,
            "Min Size": 2,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This no-frills wooden shelter contains a simple table, pallet bed, and stool. One person can build a shack with simple tools and basic materials. For an additional 1 point of Goods and 2 points of Labor, you can construct a brick or stone hut instead of a wooden shack."
        },
        {
            "Name": "Sitting Room",
            "Check Bonus": 4,
            "gp": 0,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 24,
            "Goods Cost": 24,
            "Influence Cost": 0,
            "Labor Cost": 24,
            "Magic Cost": 0,
            "Total Cost": 480,
            "Min Size": 6,
            "Max Size": 10,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Bluff, Diplomacy, Intimidate, Knowledge (local), and Perform checks"
            },
            "Description": "This is a room used for meeting and entertaining in a relaxed, comfortable setting, such as a den, dining room, or smoking room. It has furnishings appropriate to its function (chairs for a sitting room, table and chairs for a dining room, and so on). By spending an hour conversing with guests in a social manner, the host of the room gains a +1 bonus on Bluff, Diplomacy, Intimidate, Knowledge (local), and Perform checks to influence or learn about those guests for the next 24 hours."
        },
        {
            "Name": "Sports Field",
            "Check Bonus": 10,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 34,
            "Influence Cost": 9,
            "Labor Cost": 36,
            "Magic Cost": 0,
            "Total Cost": 790,
            "Min Size": 40,
            "Max Size": 100,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This outdoor area is used for jousting, athletics, war games, and other sports. a Sports Field contains a playing area, seats for spectators and equipment for one type of game."
        },
        {
            "Name": "Stall",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 1,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 250,
            "Min Size": 6,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Stall is a place to keep 1–2 horses or other Large domestic animals. It contains gates, feed troughs, feed, and straw."
        },
        {
            "Name": "Statue",
            "Check Bonus": 1,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 2,
            "Goods Cost": 2,
            "Influence Cost": 0,
            "Labor Cost": 4,
            "Magic Cost": 0,
            "Total Cost": 60,
            "Min Size": 1,
            "Max Size": 9,
            "Upgrades": 1,
            "Benefit": {
                "Note": "Price doesn't include statue, must be installed for bonus"
            },
            "Description": "This area contains a statue, fountain, or other large decoration. If it has religious significance, it might serve as a shrine. The listed cost and time are only to install a completed wood, bronze, or stone feature — they don’t include the cost and time to create the feature in the first place, but it must be installed to produce Earnings."
        },
        {
            "Name": "Storage",
            "Check Bonus": 2,
            "gp": 1,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 8,
            "Goods Cost": 6,
            "Influence Cost": 0,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 120,
            "Min Size": 4,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "Storage is any room used to store objects, keeping them out of the way for later use. Most Warehouses are just multiple Storage rooms built into a single building. A low-cost shop may allow its customers to browse items in the Storage area. A door to a Storage room includes an average lock."
        },
        {
            "Name": "Storefront",
            "Check Bonus": 5,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 1,
            "Time": 12,
            "Goods Cost": 10,
            "Influence Cost": 3,
            "Labor Cost": 6,
            "Magic Cost": 0,
            "Total Cost": 190,
            "Min Size": 2,
            "Max Size": 4,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This is a simple storefront, holding a wooden counter, a ledger, shelves, and other necessities to run a business."
        },
        {
            "Name": "Summoning Chamber",
            "Check Bonus": 3,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 1,
            "Capital": 0,
            "Time": 28,
            "Goods Cost": 22,
            "Influence Cost": 12,
            "Labor Cost": 20,
            "Magic Cost": 50,
            "Total Cost": 1040,
            "Min Size": 6,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Charisma, Diplomacy, Intimidate, and Knowledge (planes) checks"
            },
            "Description": "A Summoning Chamber is used to perform magical rituals to conjure outsiders. It contains a well-drawn, nearly complete magic circle on the floor—which you can complete with just a few chalk marks — suitable for use with magic circle spells, planar binding spells, and so on. A person who uses a Summoning Chamber gains a +3 bonus on Knowledge (planes) checks relating to a creature being called or summoned, and a +3 bonus on Charisma checks, Diplomacy checks, and Intimidate checks to influence or bargain with a creature called or summoned here."
        },
        {
            "Name": "Throne Room",
            "Check Bonus": 15,
            "gp": 0,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 40,
            "Goods Cost": 50,
            "Influence Cost": 15,
            "Labor Cost": 50,
            "Magic Cost": 50,
            "Total Cost": 1650,
            "Min Size": 40,
            "Max Size": 80,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Bluff, Diplomacy, and Intimidate, Knowledge (local), and Perform checks"
            },
            "Description": "A Throne Room is used to receive important visitors, such as nobles. The room contains a throne, various decorations, and a few seats for visitors. By spending an hour conversing with visitors, the host of the room gains a +1 bonus on Bluff, Diplomacy, Intimidate, Knowledge (local), and Perform checks to influence or learn about those guests for the next 24 hours."
        },
        {
            "Name": "Tollbooth",
            "Check Bonus": 4,
            "gp": 1,
            "Goods": 1,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 6,
            "Goods Cost": 4,
            "Influence Cost": 3,
            "Labor Cost": 4,
            "Magic Cost": 0,
            "Total Cost": 110,
            "Min Size": 1,
            "Max Size": 5,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Tollbooth is a small shelter designed to restrict movement on a road or bridge so the owner can collect fees from travelers. If this room is built near a settlement, it requires 1 point of Influence per day to maintain — or might be illegal, depending on the settlement."
        },
        {
            "Name": "Torture Chamber",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 20,
            "Goods Cost": 14,
            "Influence Cost": 9,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 330,
            "Min Size": 6,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on Intimidate checks"
            },
            "Description": "This grim room is used for interrogation as well as torture and other morally questionable acts. It contains structures to bind humanoids and various implements designed to inflict pain and discomfort. Interrogators in this room gain a +3 bonus on Intimidate checks to influence captives."
        },
        {
            "Name": "Trophy Room",
            "Check Bonus": 5,
            "gp": 1,
            "Goods": 0,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 12,
            "Influence Cost": 3,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 250,
            "Min Size": 4,
            "Max Size": 20,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This is a place to hang trophies from your adventures, such as stuffed monster heads, rare paintings, strange statues, and old magic items you don’t need any more. Because of the display cases and clutter, this room isn’t much good for anything else, though it might include chairs or benches to allow people to sit while they admire your treasures. If you want to use your trophies to decorate another room instead of placing them in their own room, construct the Furnishings augmentation instead. A Museum makes money by charging visitors or sponsors to view items like these."
        },
        {
            "Name": "Vault",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 4,
            "Max Size": 8,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "This is a secure room designed to keep out intruders. The access to this space is controlled by an iron door with a good lock. If you upgrade this room to a Secret Room, the door retains its material and lock and also becomes a secret door."
        },
        {
            "Name": "War Room",
            "Check Bonus": 0,
            "gp": 0,
            "Goods": 0,
            "Influence": 0,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 4,
            "Max Size": 12,
            "Upgrades": 0,
            "Benefit": {
                "Note": "bonus on mass combat and skill checks while scheming"
            },
            "Description": "This is a room for planning military maneuvers, plotting grand heists, or providing briefings. It contains a large central table with plenty of chairs, maps, and figures to simulate troops and structures. When it’s used for planning a battle, your army gains a +2 bonus on attack rolls and morale checks for their next battle within 24 hours. To grant the army this bonus, the army’s commander must be present at the planning meeting for the battle or you must have some way of communicating these instructions to the commander. When used to scheme for an upcoming adventure, a War Room allows you to use the scheme’s planning bonus on two skill checks instead of one."
        },
        {
            "Name": "Watering Hole",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 25,
            "Goods Cost": 20,
            "Influence Cost": 0,
            "Labor Cost": 10,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 30,
            "Max Size": 50,
            "Upgrades": 0,
            "Benefit": {
                "Note": ""
            },
            "Description": "A Watering Hole provides bathing and drinking water for animals and traveling caravans. In addition to the pool of water itself, the Watering Hole also provides open space around it where animals can gather and rest. The pool can be a modified natural pond or spring, or it may be an artificially constructed pool that maximizes shore space around which animals can gather. Watering Holes often attract predators, which must be driven off or killed."
        },
        {
            "Name": "Workstation",
            "Check Bonus": 8,
            "gp": 1,
            "Goods": 1,
            "Influence": 1,
            "Labor": 0,
            "Magic": 0,
            "Capital": 0,
            "Time": 16,
            "Goods Cost": 16,
            "Influence Cost": 0,
            "Labor Cost": 14,
            "Magic Cost": 0,
            "Total Cost": 300,
            "Min Size": 8,
            "Max Size": 16,
            "Upgrades": 0,
            "Benefit": {
                "Note": "counts as masterwork artisan's tools for one Craft or Profession skill"
            },
            "Description": "This includes a table, chair, and appropriate masterwork artisan’s tools for one Craft or Profession skill you choose when you build the room. For example, if intended for a carpenter, it has clamps, saws, nails, hammers, and a sturdy worktable. Up to three people can use the room at a time."
        }
    ]`,
    `{
  "buildings": [],
  "activeBuilding": ""
}`
]
try {
    for (let i = 0; i < files.length; i++){
        if (!fs.existsSync(files[i])){
            fs.writeFileSync(files[i], fileContent[i])
        }
    }
}catch (e) {
    console.log(e)
}finally {
    function isDev() {
        return !app.isPackaged;
    }

    function createWindow() {
        // Create the browser window.
        mainWindow = new BrowserWindow({
            width: 1200,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            // Use this in development mode.
            icon: isDev() ? path.join(process.cwd(), 'public/favicon.png') : path.join(__dirname, 'public/favicon.png'),
            // Use this in production mode.
            // icon: path.join(__dirname, 'public/favicon.png'),
            show: false
        });
        mainWindow.nativeTheme = "dark"
        if (isDev()) mainWindow.webContents.openDevTools()
        mainWindow.setMenu(null)
        // This block of code is intended for development purpose only.
        // Delete this entire block of code when you are ready to package the application.
        if (isDev()) {
            mainWindow.loadURL('http://localhost:5000/');
        } else {
            loadURL(mainWindow);
        }

        // Uncomment the following line of code when app is ready to be packaged.
        // loadURL(mainWindow);

        // Open the DevTools and also disable Electron Security Warning.
        // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
        // mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null
        });

        // Emitted when the window is ready to be shown
        // This helps in showing the window gracefully.
        mainWindow.once('ready-to-show', () => {
            mainWindow.show()
        });
    }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

// Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') app.quit()
    });

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) createWindow()
    });


    ipcMain.on('load-resources', ((event, arg) => {
        let j;
        if (fs.existsSync(`${arg}.json`)){
            let rawData = fs.readFileSync(`${arg}.json`)
            j = JSON.parse(rawData)
        }else {
            j = JSON.parse(fileContent[files.indexOf(`${arg}.json`)])
        }

        event.returnValue = j
    }))



    ipcMain.on('save-file', ((event, arg) => {
        let rawData = fs.writeFileSync("save.json", arg)
        event.returnValue = rawData
    }))
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


}


