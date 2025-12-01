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
        var result = ParseInput(input)
            .Aggregate((dial: 50, zeroes: 0), (acc, curr) =>
            {
                var dial = curr.direction switch
                {
                    'L' => acc.dial - curr.ticks % 100,
                    'R' => acc.dial + curr.ticks % 100,
                    _ => acc.dial
                } ;
                return (dial switch
                {
                    < 0 => dial + 100,
                    >= 100 => dial - 100,
                    _ => dial
                }, acc.zeroes + (dial is 0 or 100 ? 1 : 0));
            });

        Assert.Equal(expectedResult, result.zeroes);
    }

    [Theory]
    [InlineData(TestInput, 6)]
    [MemberData(nameof(Part2Input))]
    public void Part2(string input, int expectedResult)
    {
        var result = ParseInput(input)
            .Aggregate((dial: InitialDial, zeroesPassed: 0), (acc, curr) =>
            {
                var dial = curr.direction switch
                {
                    'L' => acc.dial - curr.ticks % 100,
                    'R' => acc.dial + curr.ticks % 100,
                    _ => acc.dial
                };

                return (
                    dial switch
                    {
                        < 0 => dial + 100,
                        >= 100 => dial - 100,
                        _ => dial
                    },
                    acc.zeroesPassed + (int)Math.Floor(curr.ticks / 100m)
                                       + ((dial, acc.dial) is (0 or >= 100, _) or (<0, not 0) ? 1 : 0)
                );
            });

        Assert.Equal(expectedResult, result.zeroesPassed);
    }

    private static IEnumerable<(char direction, int ticks)> ParseInput(string input) =>
        input.Split(Environment.NewLine,
                StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
            .Select(i => (i[0], int.Parse(i[1..])));

    public static TheoryData<string, int> Part1Input => [(Input, 1145)];
    public static TheoryData<string, int> Part2Input => [(Input, 6561)];

    private static readonly string Input = File.ReadAllText("./input01.txt");
}