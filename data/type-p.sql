-- for now with real newlines

insert into mazes.maze values(nextval('mazes.maze_seq'),'Maze P Simple',
'##########n'||
'#   M    #n'||
'#  D# #  #n'||
'#   # #  #n'||
'#    P D #n'||
'##########',
null,'A demo with 1 monster','P', now(),'admin',now(),'admin');

insert into mazes.maze values(nextval('mazes.maze_seq'),'Maze P 60x20',
'############################################################n'||
'#     #                      MMM D ##         #   #        #n'||
'####  # ### ## ##     ############            #  ## D #### #n'||
'# D       ######    ###  #####            #         ####   #n'||
'# # #            #   #    #########            #         ###n'||
'# # # ########## # # # ####            #       #           #n'||
'# #####        ##### # ####            #       #####       #n'||
'#     ##  #                          # #       #         # #n'||
'##### ##  ################## # # #   # #       # ####    # #n'||
'#                          # # # #   # #       # ####    # #n'||
'#  ###   ##### ######    # # # # #   # #       # ####    # #n'||
'#  # #       # #       ### # # # ##### ####### # #  #    # #n'||
'#  # #    ## # #####     # # # #                           #n'||
'#          # #  ##    D      # ###### #########           ##n'||
'#### #     # ##  ############# #                   # #     #n'||
'#    # ### # ##  #             #        # #        ###     #n'||
'#  ###              ############     #### ####     # #     #n'||
'#  ###########                    ######   #####           #n'||
'#                          @                               #n'||
'############################################################',
null,'A 60x20 grid with 3 monster and 4 diamonds','P', now(),'admin',now(),'admin');