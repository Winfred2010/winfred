import re 

def decode_matrix(matrix_text):
    """
    Decodes a secret message from a character matrix by reading column-wise
     and cleaning non-alphabetical characters between words.
    """
    # Transform string into a grid (list of rows)
    lines = matrix_text.strip('\n').split('\n')
    num_rows = len(lines)
    num_cols = max(len(line) for line in lines)
    
    # Extract characters column by column
    combined_chars = []
    for col in range(num_cols):
        for row in range(num_rows):
            # Only add if the character exists in this row/column position
            if col < len(lines[row]):
                combined_chars.append(lines[row][col])
    
    full_string = "".join(combined_chars)
    
    #  Clean symbols/numbers between alpha characters using Regex
    # This replaces any sequence of non-letters between two letters with a space
    decoded_message = re.sub(r'(?<=[a-zA-Z])[^a-zA-Z]+(?=[a-zA-Z])', ' ', full_string)
    
    return decoded_message

if __name__ == "__main__":
    MATRIX_STR = '''7i3
Tsi
h%x
i  
sM#
$a 
#t%'''

    result = decode_matrix(MATRIX_STR)
    print(f"Decoded Message: {result}")
