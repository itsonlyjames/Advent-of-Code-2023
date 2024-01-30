grid = input().split(",")

def hash(s):
    v = 0
    for ch in s:
        v += ord(ch)
        v *= 17
        v %= 256
    return v

boxes = [[] for _ in range(256)]
focal_lengths = {}

for ins in grid:
    if "-" in ins:
        label = ins[:-1]
        index = hash(label)
        if label in boxes[index]:
            boxes[index].remove(label)
    else:
        label, length = ins.split("=")
        length = int(length)
        index = hash(label)
        if label not in boxes[index]:
            boxes[index].append(label)

        focal_lengths[label] = length

total = 0

for box_num, box in enumerate(boxes, 1):
    for lens, label in enumerate(box, 1):
        total += box_num * lens * focal_lengths[label]

print("Part 1", sum(map(hash, grid)))
print("Part 2", total)
