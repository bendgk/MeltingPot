from PIL import Image, ImageDraw, ImageFont

ingredient = "peppers"

font = ImageFont.truetype("arial.ttf", 18)


img = Image.new('RGB', (200, 200), color = (0, 0, 0))
d = ImageDraw.Draw(img)
d.text((100,100), ingredient, fill=(255,255,255), font=font)
img.save('images/' + ingredient + ".jpg")
