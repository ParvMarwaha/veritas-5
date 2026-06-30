import os
import glob

replacements = {
    'max-w-[1400px]': 'max-w-[1260px]',
    'max-w-[1536px]': 'max-w-[1380px]',
    'max-w-6xl': 'max-w-5xl',
    'max-w-5xl': 'max-w-4xl',
    'max-w-4xl': 'max-w-3xl',
    'text-[56px]': 'text-[48px]',
    'text-[72px]': 'text-[64px]',
    'text-[28px]': 'text-[24px]',
    'text-[24px]': 'text-[20px]',
    'text-[18px]': 'text-[16px]',
    'text-[16px]': 'text-[14px]',
    'text-[14px]': 'text-[12px]',
    'text-5xl': 'text-4xl',
    'text-4xl': 'text-3xl',
    'text-3xl': 'text-2xl',
    'py-32': 'py-28',
    'py-24': 'py-20',
    'mb-24': 'mb-20',
    'mb-20': 'mb-16'
}

components = glob.glob('src/components/**/*.tsx', recursive=True)

for file_path in components:
    with open(file_path, 'r') as file:
        content = file.read()
        
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(file_path, 'w') as file:
        file.write(content)

print("Scaled down all components successfully.")
