# This model is scoped to historic data from 1935 to 2021.
# The benifits and limitations of this method are described in our report.

year_input = input('Enter a year: ')

x = int(year_input)

y = (-0.0605 * x**2) + (239.8026 * x) + (-235620)

print(y)