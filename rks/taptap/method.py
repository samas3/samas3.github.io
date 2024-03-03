import base64
import io
import struct

import zipfile
import requests

from collections import OrderedDict
from requests.adapters import HTTPAdapter
from Crypto.Cipher import AES

from Crypto.Util import Padding


levels = ["EZ", "HD", "IN", "AT"]
difficulty = OrderedDict()
dict_fuzzy = {}
info = {}
info_by = {}
info_illustrator = {}
info_ez_desinger = {}
info_hd_designer = {}
info_in_desingner = {}
info_at_designer = {}

# info saver


global_headers = {
    "X-LC-Id": "rAK3FfdieFob2Nn8Am",
    "X-LC-Key": "Qr9AEqtuoSVS3zeD6iVbM4ZC0AtkJcQ89tywVyi0",
    "User-Agent": "LeanCloud-CSharp-SDK/1.0.3",
    "Accept": "application/json",
}

key = base64.b64decode("6Jaa0qVAJZuXkZCLiOa/Ax5tIZVu+taKUN1V1nqwkks=")
iv = base64.b64decode("Kk/wisgNYwcAV8WVGMgyUw==")


def getBool(num, index):
    return bool(num & 1 << index)


class ByteReader:
    def __init__(self, data: bytes):
        self.data = data
        self.position = 0

    def readVarShort(self):
        num = self.data[self.position]
        if num < 128:
            self.position += 1
        else:
            self.position += 2
        return num

    def readString(self):
        length = self.data[self.position]
        self.position += length + 1
        return self.data[self.position - length : self.position].decode()

    def readScoreAcc(self):
        self.position += 8
        scoreAcc = struct.unpack("if", self.data[self.position - 8 : self.position])
        return {"score": scoreAcc[0], "acc": scoreAcc[1]}

    def readRecord(self, songId):
        end_position = self.position + self.data[self.position] + 1
        self.position += 1
        exists = self.data[self.position]
        self.position += 1
        fc = self.data[self.position]
        self.position += 1
        diff = difficulty[songId]
        records = []
        song_names = info[songId]
        for level in range(len(diff)):
            if getBool(exists, level):
                scoreAcc = self.readScoreAcc()
                scoreAcc["level"] = levels[level]
                scoreAcc["fc"] = getBool(fc, level)
                scoreAcc["songId"] = songId
                scoreAcc["songname"] = song_names
                scoreAcc["difficulty"] = diff[level]
                scoreAcc["rks"] = (scoreAcc["acc"] - 55) / 45
                scoreAcc["rks"] = (
                    scoreAcc["rks"] * scoreAcc["rks"] * scoreAcc["difficulty"]
                )
                records.append(scoreAcc)
        self.position = end_position
        return records


class DataPackage:
    @staticmethod
    def GameReader(url):
        resp = requests.get(url, headers=global_headers)
        if resp.status_code != 200:
            raise Exception("Network error.")
        data = resp.content
        with zipfile.ZipFile(io.BytesIO(data)) as zips:
            with zips.open("gameRecord") as gameRecord_file:
                if gameRecord_file.read(1) != b"\x01":
                    raise "版本号不正确，可能协议已更新。"
                return gameRecord_file.read()


def decrypt_gameRecord(gameRecord):
    gameRecord = AES.new(key, AES.MODE_CBC, iv).decrypt(gameRecord)
    return Padding.unpad(gameRecord, AES.block_size)


def parse_render_bests(gameRecord, overflow: int):
    records = []
    if overflow < 0:
        overflow = 0
    if overflow > 21:
        overflow = 21
    reader = ByteReader(gameRecord)
    for _ in range(reader.readVarShort()):
        songId = reader.readString()[:-2]
        record = reader.readRecord(songId)
        records.extend(record)
    records.sort(key=lambda x: x["rks"], reverse=True)
    try:
        render = [
            max(
                filter(lambda x: x["score"] == 1000000, records),
                key=lambda x: x["difficulty"],
            )
        ]
        render.extend(records[: 19 + overflow])
        isPhi = True
    except ValueError:
        render = records[: 19 + overflow]
        isPhi = False
    return render, isPhi


def get_songs_stat_main(gameRecord, songid, diff):
    reader = ByteReader(gameRecord)
    getdiff = diff  # Diff should be EZ,HD,IN,AT
    if getdiff != "EZ" and getdiff != "HD" and getdiff != "IN" and getdiff != "AT":
        getdiff = "IN"
    for _ in range(reader.readVarShort()):
        songId = reader.readString()[:-2]
        record = reader.readRecord(songId)
        if songId == songid:
            if record[0]["level"] == getdiff:
                return record[0], None
            else:
                continue
    return None, "No Records Found , check songid is correct or the record is existed?"


class BestsRender:
    @staticmethod
    def read_difficulty(path):
        difficulty.clear()
        with open(path, encoding="utf-8") as f:
            lines = f.readlines()
        for line in lines:
            line = line[:-1].split(",")
            diff = []
            for i in range(1, len(line)):
                diff.append(float(line[i]))
            difficulty[line[0]] = diff

    @staticmethod
    def read_playerInfo(path):
        info.clear()
        with open(path, encoding="utf-8") as f:
            lines = f.readlines()
        for line in lines:
            line = line[:-1].split("\\")
            infos = []
            for i in range(1, len(line)):
                infos.append(str(line[i]))
            info[line[0]] = infos[0]
            info_by[line[0]] = infos[1]
            info_illustrator[line[0]] = infos[2]
            info_ez_desinger[line[0]] = infos[3]
            info_hd_designer[line[0]] = infos[4]
            info_in_desingner[line[0]] = infos[5]
            try:
                info_at_designer[line[0]] = infos[6]
            except Exception:
                info_at_designer[line[0]] = ""

    @staticmethod
    def get_playerId(sessionToken):
        headers = global_headers.copy()
        headers["X-LC-Session"] = sessionToken
        response = requests.get(
            "https://rak3ffdi.cloud.tds1.tapapis.cn/1.1/users/me", headers=headers
        )
        result = response.json()["nickname"]
        return result

    @staticmethod
    def get_summary(sessionToken):
        try:
            s = requests.session()
            s.mount("http://", HTTPAdapter(max_retries=3))
            s.mount("https://", HTTPAdapter(max_retries=3))
            headers = global_headers.copy()
            headers["X-LC-Session"] = sessionToken
            response = s.get(
                "https://rak3ffdi.cloud.tds1.tapapis.cn/1.1/classes/_GameSave",
                headers=headers,
                timeout=5,
            )
        except Exception as e:
            return None, "Network error."
        result = response.json()["results"][0]
        updateAt = result["updatedAt"]
        url = result["gameFile"]["url"]
        summary = base64.b64decode(result["summary"])
        summary = struct.unpack("=BHfBx%ds12H" % summary[8], summary)
        return {
            "updateAt": updateAt,
            "url": url,
            "saveVersion": summary[0],
            "challenge": summary[1],
            "rks": summary[2],
            "gameVersion": summary[3],
            "avatar": summary[4].decode(),
            "EZ": summary[5:8],
            "HD": summary[8:11],
            "IN": summary[11:14],
            "AT": summary[14:17],
        }

    @staticmethod
    def get_formatData(sessionToken):
        try:
            s = requests.session()
            s.mount("http://", HTTPAdapter(max_retries=3))
            s.mount("https://", HTTPAdapter(max_retries=3))
            headers = global_headers.copy()
            headers["X-LC-Session"] = sessionToken
            response = s.get(
                "https://rak3ffdi.cloud.tds1.tapapis.cn/1.1/classes/_GameSave",
                headers=headers,
                timeout=5,
            )
        except Exception as e:
            return None, "Network error."
        result = response.json()["results"][0]
        summary = base64.b64decode(result["summary"])
        get_id = BestsRender.get_playerId(sessionToken)
        summary = struct.unpack("=BHfBx%ds12H" % summary[8], summary)
        return {
            "PlayerID": get_id,
            "ChallengeModeRank": summary[1],
            "RankingScore": summary[2],
        }

    @staticmethod
    def get_bests(session, overflow):
        try:
            s = requests.session()
            s.mount("http://", HTTPAdapter(max_retries=3))
            s.mount("https://", HTTPAdapter(max_retries=3))
            headers = global_headers.copy()
            headers["X-LC-Session"] = session
            response = s.get(
                "https://rak3ffdi.cloud.tds1.tapapis.cn/1.1/classes/_GameSave",
                headers=headers,
                timeout=5,
            )
        except Exception as e:
            return None, "Network error."
        result = response.json()["results"][0]["gameFile"]["url"]
        gameRecord = DataPackage.GameReader(result)
        gameRecord = decrypt_gameRecord(gameRecord)
        return parse_render_bests(gameRecord, overflow)

    @staticmethod
    def get_songs_stats(session, songid, diff):
        try:
            s = requests.session()
            s.mount("http://", HTTPAdapter(max_retries=3))
            s.mount("https://", HTTPAdapter(max_retries=3))
            headers = global_headers.copy()
            headers["X-LC-Session"] = session
            response = s.get(
                "https://rak3ffdi.cloud.tds1.tapapis.cn/1.1/classes/_GameSave",
                headers=headers,
                timeout=5,
            )
        except Exception as e:
            return None, "Network error."
        result = response.json()["results"][0]["gameFile"]["url"]
        if result == None:
            return None, "No Game Record"
        gameRecord = DataPackage.GameReader(result)
        gameRecord = decrypt_gameRecord(gameRecord)
        return get_songs_stat_main(gameRecord, songid, diff)


def song_info_handler_main(songid: str):
    try:
        result_info_name = info[songid]
        result_info_by = info_by[songid]
        result_get_diff_list: list = difficulty[songid]  # list
        result_get_ins_by = info_illustrator[songid]
        result_get_ez_designer = info_ez_desinger[songid]
        result_get_hd_desinger = info_hd_designer[songid]
        result_get_in_desinger = info_in_desingner[songid]
        result_get_at_desinger = info_at_designer[songid]
        showEZDetailed = {
            "EZ": {"rating": result_get_diff_list[0], "charter": result_get_ez_designer}
        }
        showHDDetailed = {
            "HD": {"rating": result_get_diff_list[1], "charter": result_get_hd_desinger}
        }
        showInDetailed = {
            "IN": {"rating": result_get_diff_list[2], "charter": result_get_in_desinger}
        }
        if len(result_get_diff_list) >= 4:
            showAtDetailed = {
                "AT": {
                    "rating": result_get_diff_list[3],
                    "charter": result_get_at_desinger,
                }
            }
        else:
            showAtDetailed = {}
        getChartDetailedInfo = {
            **showEZDetailed,
            **showHDDetailed,
            **showInDetailed,
            **showAtDetailed,
            "level_list": result_get_diff_list,
        }
        infos = {
            "songname": result_info_name,
            "composer": result_info_by,
            "illustrator": result_get_ins_by,
            "chartDetail": getChartDetailedInfo,
        }
        content = {"songid": songid, "info": infos}
        return content
    except Exception as e:
        return {}
    
BestsRender.read_difficulty('difficulty.csv')
BestsRender.read_playerInfo('info.csv')
print(BestsRender.get_summary('radt93iuj8cpzz6r3u21a4od8'))
print(BestsRender.get_bests('radt93iuj8cpzz6r3u21a4od8', 0))