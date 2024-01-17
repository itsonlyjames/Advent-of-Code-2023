use std::fs::read_to_string;

#[derive(Debug, Default)]
struct Turn {
    red: usize,
    green: usize,
    blue: usize
}

impl Turn {
    fn is_valid(&self) -> bool {
        self.red <= 12 && self.green <= 13 && self.blue <= 14    
    }
}

fn solve(part: i32) -> usize { 
    let mut games = Vec::new();

    let lines: Vec<String> = read_to_string("../2/input.txt")
        .expect("unable to open file")
        .split('\n')
        .filter(|s| !s.is_empty())
        .map(|s| s.to_string())
        .collect();

    for line in lines {
        let(_, turns) = line.split_once(": ").unwrap();
        let turns = turns.split("; ").collect::<Vec<_>>();
        let mut turn_list = Vec::new();
        for t in turns {
            let cubes = t.split(", ").collect::<Vec<_>>();
            let mut turn = Turn::default();
            for c in cubes {
                let (amount, color) = c.split_once(" ").unwrap();
                let amount: usize = amount.parse().unwrap();
                match &color[0..1] {
                    "r" => turn.red = amount,
                    "g" => turn.green = amount,
                    "b" => turn.blue = amount,
                    _ => panic!("bug in your code"),
                }
            }
            turn_list.push(turn);
        }
        games.push(turn_list);
    }


    let mut total = 0;

    if part == 1 {
        'next_game: for (index, game) in games.iter().enumerate() {
            for turn in game {
                if !turn.is_valid() {
                    continue 'next_game;
                }
            }
            total += index + 1
        }
    } else {
        for game in games {
            let mut red = 0;
            let mut green = 0;
            let mut blue = 0;
            for turn in game {
                red = red.max(turn.red);
                green = green.max(turn.green);
                blue = blue.max(turn.blue);
            }
            total += red * green * blue
        }
    }

    return total
}

fn main() {
    for part in [1,2] {
        let result = solve(part);
        println!("Part {}: {}", part, result);
    }
}
