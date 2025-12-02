using System.Numerics;

namespace AoC2025;

public class Day2
{
    private const string TestInput =
        "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

    [Theory]
    [InlineData(TestInput, 1227775554)]
    [MemberData(nameof(Part1Input))]
    public void Part1(string input, long expectedResult)
    {
        var result = ParseInput(input)
            .Aggregate(0L, (acc, cur) =>
            {
                var result = acc;
                for (var i = cur.rangeStart; i <= cur.rangeEnd; i++)
                {
                    if (i >= 11
                        && i.ToString() is { } number
                        && number.Length % 2 == 0
                        && number[..(number.Length / 2)].Equals(number[(number.Length / 2)..]))
                    {
                        result += i;
                    }
                }

                return result;
            });

        Assert.Equal(expectedResult, result);
    }
    
    [Theory]
    [InlineData(TestInput, 4174379265)]
    [MemberData(nameof(Part2Input))]
    public void Part2(string input, long expectedResult)
    {
        var result = ParseInput(input)
            .Aggregate(0L, (acc, cur) =>
            {
                var result = acc;
                for (var i = cur.rangeStart; i <= cur.rangeEnd; i++)
                {
                    if (i >= 11
                        && i.ToString() is { } number
                        && HasDuplications(number))
                    {
                        result += i;
                    }
                }

                return result;
            });

        Assert.Equal(expectedResult, result);
    }

    private static bool HasDuplications(string number)
    {
        var stepsToCheck = (int)Math.Floor(number.Length / 2d);
        for (var i = 2; i <= stepsToCheck + 2; i++)
        {
            if (number.Length % i != 0) continue;
            var firstPart = number[..(number.Length / i)];
            if (SplitInParts(number, i).Skip(1).All(p => p.Equals(firstPart)))
            {
                return true;
            }
        }
        return false;
    }

    private static IEnumerable<string> SplitInParts(string s, int x)
    {
        var partLength = s.Length / x;
        for (var i = 0; i < s.Length; i += partLength)
            yield return s.Substring(i, partLength);
    }

    private static IEnumerable<(long rangeStart, long rangeEnd)> ParseInput(string input) =>
        input.Split(',',
                StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
            .Select(i => i.Split('-'))
            .Select(i => (long.Parse(i[0]), long.Parse(i[1])));

    public static TheoryData<string, long> Part1Input => [(Input, 18893502033)];
    public static TheoryData<string, long> Part2Input => [(Input, 6561)];

    private static readonly string Input = File.ReadAllText("./input02.txt");
}