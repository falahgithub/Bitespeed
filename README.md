# Bitespeed

# What I Understand from the Challenge:


The challenge requires creating a post route "/identify" with the following functionalities:

1- If both entries are filled, both the Find and Create functions will be called.


2- If both entries are not filled, only the Find function will be called.


3- If the Create function is called, certain conditions need to be checked:

    
    3.1- If both entries are found in the database, but belonging to different users, the secondary account becomes primary.
    
    
    3.2- If one entry is found, a secondary account will be created.
    
    
    3.3- If no entry is found, a primary account will be created.
