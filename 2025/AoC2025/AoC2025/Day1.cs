namespace AoC2025;

public class Day1
{
    private const int InitialDial = 50;

    private const string TestInput = """
                                     L68
                                     L30
                                     R48
                                     L5
                                     R60
                                     L55
                                     L1
                                     L99
                                     R14
                                     L82

                                     """;

    [Theory]
    [InlineData(TestInput, 3)]
    [MemberData(nameof(Part1Input))]
    public void Part1(string input, int expectedResult)
    {
        List<int> initialLocations = [InitialDial];
        var locations = ParseInput(input)
            .Aggregate(initialLocations, (acc, curr) =>
            {
                var previous = acc.Last();
                var ticks = curr.ticks;
                var newValue = curr.direction switch
                {
                    'L' => (previous -= ticks) < 0
                        ? (previous = 100 - Math.Abs(previous) % 100) is 100 ? 0 : previous
                        : previous,
                    'R' => (previous += ticks) >= 100 ? previous % 100 : previous,
                    _ => previous
                };
                acc.Add(newValue);
                return acc;
            });

        Assert.Equal(expectedResult, locations.Where(v => v is 0).Count());
    }

    [Theory]
    [InlineData(TestInput, 6)]
    [MemberData(nameof(Part2Input))]
    public void Part2(string input, int expectedResult)
    {
        var result = ParseInput(input)
            .Aggregate((dial: InitialDial, zeroes: 0), (acc, curr) =>
            {
                acc.zeroes += (int)Math.Floor(curr.ticks / 100m);
                var diff = curr.ticks % 100;
                var dial = curr.direction switch
                {
                    'L' => acc.dial - diff,
                    'R' => acc.dial + diff,
                    _ => acc.dial
                };

                if (dial is 0 || dial < 0 && acc.dial is not 0 || dial >= 100)
                {
                    acc.zeroes++;
                }

                return (
                    dial switch
                    {
                        < 0 => dial + 100,
                        >= 100 => dial - 100,
                        _ => dial
                    },
                    acc.zeroes
                );
            });

        Assert.Equal(expectedResult, result.zeroes);
    }

    private static IEnumerable<(char direction, int ticks)> ParseInput(string input) =>
        input.Split(Environment.NewLine,
                StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
            .Select(i => (i[0], int.Parse(i[1..])));

    public static TheoryData<string, int> Part1Input => [(Input, 1145)];
    public static TheoryData<string, int> Part2Input => [(Input, 6561)];

    private static readonly string Input = File.ReadAllText("./input01.txt");
}